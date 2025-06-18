using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "brands",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_brands", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "clients",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    lastname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    telephone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_clients", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "service_status",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_service_status", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "service_type",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    unit_price = table.Column<decimal>(type: "numeric(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_service_type", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "spares",
                columns: table => new
                {
                    code = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    stock_quantity = table.Column<int>(type: "integer", nullable: false),
                    unit_price = table.Column<decimal>(type: "numeric(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_spares", x => x.code);
                });

            migrationBuilder.CreateTable(
                name: "user_member",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    lastname = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    password = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_member", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "vehicle_models",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    id_brand = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vehicle_models", x => x.id);
                    table.ForeignKey(
                        name: "FK_vehicle_models_brands_id_brand",
                        column: x => x.id_brand,
                        principalTable: "brands",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "invoices",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    total_spares = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    total_services = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    final_amount = table.Column<decimal>(type: "numeric(12,2)", nullable: false),
                    id_client = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_invoices", x => x.id);
                    table.ForeignKey(
                        name: "FK_invoices_clients_id_client",
                        column: x => x.id_client,
                        principalTable: "clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user_role",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_user_member = table.Column<int>(type: "integer", nullable: false),
                    id_role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_role", x => x.id);
                    table.ForeignKey(
                        name: "FK_user_role_roles_id_role",
                        column: x => x.id_role,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_role_user_member_id_user_member",
                        column: x => x.id_user_member,
                        principalTable: "user_member",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "vehicles",
                columns: table => new
                {
                    serial_number = table.Column<string>(type: "text", nullable: false),
                    release_year = table.Column<int>(type: "integer", nullable: false),
                    km = table.Column<long>(type: "bigint", nullable: false),
                    id_model = table.Column<int>(type: "integer", nullable: false),
                    id_client = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vehicles", x => x.serial_number);
                    table.ForeignKey(
                        name: "FK_vehicles_clients_id_client",
                        column: x => x.id_client,
                        principalTable: "clients",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_vehicles_vehicle_models_id_model",
                        column: x => x.id_model,
                        principalTable: "vehicle_models",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "service_order",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    description = table.Column<string>(type: "text", nullable: true),
                    date_entry = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    delivery_date = table.Column<DateTime>(type: "timestamp", nullable: true),
                    serial_number = table.Column<string>(type: "text", nullable: false),
                    id_service_type = table.Column<int>(type: "integer", nullable: false),
                    id_user_member = table.Column<int>(type: "integer", nullable: false),
                    id_status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_service_order", x => x.id);
                    table.ForeignKey(
                        name: "FK_service_order_service_status_id_status",
                        column: x => x.id_status,
                        principalTable: "service_status",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_service_order_service_type_id_service_type",
                        column: x => x.id_service_type,
                        principalTable: "service_type",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_service_order_user_member_id_user_member",
                        column: x => x.id_user_member,
                        principalTable: "user_member",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_service_order_vehicles_serial_number",
                        column: x => x.serial_number,
                        principalTable: "vehicles",
                        principalColumn: "serial_number",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "invoice_details",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_invoice = table.Column<int>(type: "integer", nullable: false),
                    id_service_order = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_invoice_details", x => x.id);
                    table.ForeignKey(
                        name: "FK_invoice_details_invoices_id_invoice",
                        column: x => x.id_invoice,
                        principalTable: "invoices",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_invoice_details_service_order_id_service_order",
                        column: x => x.id_service_order,
                        principalTable: "service_order",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "order_details",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    spare_quantity = table.Column<int>(type: "integer", nullable: false),
                    id_service_order = table.Column<int>(type: "integer", nullable: false),
                    code_spare = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_order_details", x => x.id);
                    table.ForeignKey(
                        name: "FK_order_details_service_order_id_service_order",
                        column: x => x.id_service_order,
                        principalTable: "service_order",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_order_details_spares_code_spare",
                        column: x => x.code_spare,
                        principalTable: "spares",
                        principalColumn: "code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_brands_name",
                table: "brands",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_clients_email",
                table: "clients",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_clients_telephone",
                table: "clients",
                column: "telephone",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_invoice_details_id_invoice",
                table: "invoice_details",
                column: "id_invoice");

            migrationBuilder.CreateIndex(
                name: "IX_invoice_details_id_service_order",
                table: "invoice_details",
                column: "id_service_order");

            migrationBuilder.CreateIndex(
                name: "IX_invoices_id_client",
                table: "invoices",
                column: "id_client");

            migrationBuilder.CreateIndex(
                name: "IX_order_details_code_spare",
                table: "order_details",
                column: "code_spare");

            migrationBuilder.CreateIndex(
                name: "IX_order_details_id_service_order",
                table: "order_details",
                column: "id_service_order");

            migrationBuilder.CreateIndex(
                name: "IX_roles_name",
                table: "roles",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_service_order_id_service_type",
                table: "service_order",
                column: "id_service_type");

            migrationBuilder.CreateIndex(
                name: "IX_service_order_id_status",
                table: "service_order",
                column: "id_status");

            migrationBuilder.CreateIndex(
                name: "IX_service_order_id_user_member",
                table: "service_order",
                column: "id_user_member");

            migrationBuilder.CreateIndex(
                name: "IX_service_order_serial_number",
                table: "service_order",
                column: "serial_number");

            migrationBuilder.CreateIndex(
                name: "IX_service_status_name",
                table: "service_status",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_service_type_description",
                table: "service_type",
                column: "description",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_member_email",
                table: "user_member",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_role_id_role",
                table: "user_role",
                column: "id_role");

            migrationBuilder.CreateIndex(
                name: "IX_user_role_id_user_member",
                table: "user_role",
                column: "id_user_member");

            migrationBuilder.CreateIndex(
                name: "IX_vehicle_models_id_brand",
                table: "vehicle_models",
                column: "id_brand");

            migrationBuilder.CreateIndex(
                name: "IX_vehicle_models_name",
                table: "vehicle_models",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_vehicles_id_client",
                table: "vehicles",
                column: "id_client");

            migrationBuilder.CreateIndex(
                name: "IX_vehicles_id_model",
                table: "vehicles",
                column: "id_model");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "invoice_details");

            migrationBuilder.DropTable(
                name: "order_details");

            migrationBuilder.DropTable(
                name: "user_role");

            migrationBuilder.DropTable(
                name: "invoices");

            migrationBuilder.DropTable(
                name: "service_order");

            migrationBuilder.DropTable(
                name: "spares");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "service_status");

            migrationBuilder.DropTable(
                name: "service_type");

            migrationBuilder.DropTable(
                name: "user_member");

            migrationBuilder.DropTable(
                name: "vehicles");

            migrationBuilder.DropTable(
                name: "clients");

            migrationBuilder.DropTable(
                name: "vehicle_models");

            migrationBuilder.DropTable(
                name: "brands");
        }
    }
}
