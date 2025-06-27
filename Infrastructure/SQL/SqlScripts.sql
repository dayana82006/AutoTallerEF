CREATE OR REPLACE FUNCTION trg_update_invoice_on_order_details()
RETURNS TRIGGER AS $$
DECLARE
    v_invoice_id INT;
BEGIN
    SELECT idet.id_invoice INTO v_invoice_id
    FROM invoice_details idet
    WHERE idet.id_service_order = COALESCE(NEW.id_service_order, OLD.id_service_order)
    LIMIT 1;

    IF v_invoice_id IS NOT NULL THEN
        PERFORM update_invoice_totals(v_invoice_id);
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_after_order_details_change
AFTER INSERT OR UPDATE OR DELETE ON order_details
FOR EACH ROW
EXECUTE FUNCTION trg_update_invoice_on_order_details();



CREATE OR REPLACE FUNCTION trg_update_invoice_on_service_order()
RETURNS TRIGGER AS $$
DECLARE
    v_invoice_id INT;
BEGIN
    SELECT idet.id_invoice INTO v_invoice_id
    FROM invoice_details idet
    WHERE idet.id_service_order = COALESCE(NEW.id, OLD.id)
    LIMIT 1;

    IF v_invoice_id IS NOT NULL THEN
        PERFORM update_invoice_totals(v_invoice_id);
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_after_service_order_change
AFTER INSERT OR UPDATE OR DELETE ON service_order
FOR EACH ROW
EXECUTE FUNCTION trg_update_invoice_on_service_order();
