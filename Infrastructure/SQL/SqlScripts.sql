CREATE OR REPLACE FUNCTION update_invoice_totals(p_invoice_id INT)
RETURNS VOID AS $$
DECLARE
    v_total_services NUMERIC := 0;
    v_total_spares NUMERIC := 0;
BEGIN
    -- Calcular el total de servicios desde service_order
    SELECT COALESCE(SUM(so.unit_price), 0)
    INTO v_total_services
    FROM invoice_details idet
    JOIN service_order so ON so.id = idet.id_service_order
    WHERE idet.id_invoice = p_invoice_id;

    -- Calcular el total de repuestos desde order_details + spares
    SELECT COALESCE(SUM(od.spare_quantity * sp.unit_price), 0)
    INTO v_total_spares
    FROM order_details od
    JOIN spares sp ON sp.code = od.code_spare
    JOIN invoice_details idet ON idet.id_service_order = od.id_service_order
    WHERE idet.id_invoice = p_invoice_id;

    -- Actualizar los campos de la factura
    UPDATE invoices
    SET
        total_services = v_total_services,
        total_spares = v_total_spares,
        final_amount = v_total_services + v_total_spares
    WHERE id = p_invoice_id;
END;
$$ LANGUAGE plpgsql;


-- =============================================
-- Trigger: order_details
-- =============================================
CREATE OR REPLACE FUNCTION trg_update_invoice_on_order_details()
RETURNS TRIGGER AS $$
DECLARE
    v_invoice_id INT;
BEGIN
    SELECT idet.id_invoice
    INTO v_invoice_id
    FROM invoice_details idet
    WHERE idet.id_service_order = COALESCE(NEW.id_service_order, OLD.id_service_order)
    LIMIT 1;

    IF v_invoice_id IS NOT NULL THEN
        PERFORM update_invoice_totals(v_invoice_id);
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_after_order_details_change ON order_details;
CREATE TRIGGER trg_after_order_details_change
AFTER INSERT OR UPDATE OR DELETE ON order_details
FOR EACH ROW
EXECUTE FUNCTION trg_update_invoice_on_order_details();

-- =============================================
-- Trigger: service_order
-- =============================================
CREATE OR REPLACE FUNCTION trg_update_invoice_on_service_order()
RETURNS TRIGGER AS $$
DECLARE
    v_invoice_id INT;
BEGIN
    SELECT idet.id_invoice
    INTO v_invoice_id
    FROM invoice_details idet
    WHERE idet.id_service_order = COALESCE(NEW.id, OLD.id)
    LIMIT 1;

    IF v_invoice_id IS NOT NULL THEN
        PERFORM update_invoice_totals(v_invoice_id);
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_after_service_order_change ON service_order;
CREATE TRIGGER trg_after_service_order_change
AFTER INSERT OR UPDATE OR DELETE ON service_order
FOR EACH ROW
EXECUTE FUNCTION trg_update_invoice_on_service_order();

-- =============================================
-- Trigger: invoice_details
-- =============================================
CREATE OR REPLACE FUNCTION trg_update_invoice_on_invoice_details()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        PERFORM update_invoice_totals(NEW.id_invoice);

    ELSIF TG_OP = 'UPDATE' THEN
        PERFORM update_invoice_totals(NEW.id_invoice);
        IF NEW.id_invoice <> OLD.id_invoice THEN
            PERFORM update_invoice_totals(OLD.id_invoice);
        END IF;

    ELSIF TG_OP = 'DELETE' THEN
        PERFORM update_invoice_totals(OLD.id_invoice);
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_after_invoice_details_change ON invoice_details;
CREATE TRIGGER trg_after_invoice_details_change
AFTER INSERT OR UPDATE OR DELETE ON invoice_details
FOR EACH ROW
EXECUTE FUNCTION trg_update_invoice_on_invoice_details();
