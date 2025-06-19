using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class SecondVersion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "id_fuel_type",
                table: "vehicles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "id_vehicle_type",
                table: "vehicles",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "client_approved",
                table: "service_order",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "fuel_type",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_fuel_type", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "specialties",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_specialties", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "vehicle_anormalities",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vehicle_anormalities", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "vehicle_type",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vehicle_type", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user_specialties",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_user = table.Column<int>(type: "integer", nullable: false),
                    id_specialty = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_specialties", x => x.id);
                    table.ForeignKey(
                        name: "FK_user_specialties_specialties_id_specialty",
                        column: x => x.id_specialty,
                        principalTable: "specialties",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_specialties_user_member_id_user",
                        column: x => x.id_user,
                        principalTable: "user_member",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "vehicle_anormalities_details",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_anormality = table.Column<int>(type: "integer", nullable: false),
                    serial_number = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vehicle_anormalities_details", x => x.id);
                    table.ForeignKey(
                        name: "FK_vehicle_anormalities_details_vehicle_anormalities_id_anorma~",
                        column: x => x.id_anormality,
                        principalTable: "vehicle_anormalities",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_vehicle_anormalities_details_vehicles_serial_number",
                        column: x => x.serial_number,
                        principalTable: "vehicles",
                        principalColumn: "serial_number",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_vehicles_id_fuel_type",
                table: "vehicles",
                column: "id_fuel_type");

            migrationBuilder.CreateIndex(
                name: "IX_vehicles_id_vehicle_type",
                table: "vehicles",
                column: "id_vehicle_type");

            migrationBuilder.CreateIndex(
                name: "IX_fuel_type_name",
                table: "fuel_type",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_specialties_name",
                table: "specialties",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_user_specialties_id_specialty",
                table: "user_specialties",
                column: "id_specialty");

            migrationBuilder.CreateIndex(
                name: "IX_user_specialties_id_user",
                table: "user_specialties",
                column: "id_user");

            migrationBuilder.CreateIndex(
                name: "IX_vehicle_anormalities_name",
                table: "vehicle_anormalities",
                column: "name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_vehicle_anormalities_details_id_anormality",
                table: "vehicle_anormalities_details",
                column: "id_anormality");

            migrationBuilder.CreateIndex(
                name: "IX_vehicle_anormalities_details_serial_number",
                table: "vehicle_anormalities_details",
                column: "serial_number");

            migrationBuilder.CreateIndex(
                name: "IX_vehicle_type_name",
                table: "vehicle_type",
                column: "name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_vehicles_fuel_type_id_fuel_type",
                table: "vehicles",
                column: "id_fuel_type",
                principalTable: "fuel_type",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_vehicles_vehicle_type_id_vehicle_type",
                table: "vehicles",
                column: "id_vehicle_type",
                principalTable: "vehicle_type",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_vehicles_fuel_type_id_fuel_type",
                table: "vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_vehicles_vehicle_type_id_vehicle_type",
                table: "vehicles");

            migrationBuilder.DropTable(
                name: "fuel_type");

            migrationBuilder.DropTable(
                name: "user_specialties");

            migrationBuilder.DropTable(
                name: "vehicle_anormalities_details");

            migrationBuilder.DropTable(
                name: "vehicle_type");

            migrationBuilder.DropTable(
                name: "specialties");

            migrationBuilder.DropTable(
                name: "vehicle_anormalities");

            migrationBuilder.DropIndex(
                name: "IX_vehicles_id_fuel_type",
                table: "vehicles");

            migrationBuilder.DropIndex(
                name: "IX_vehicles_id_vehicle_type",
                table: "vehicles");

            migrationBuilder.DropColumn(
                name: "id_fuel_type",
                table: "vehicles");

            migrationBuilder.DropColumn(
                name: "id_vehicle_type",
                table: "vehicles");

            migrationBuilder.DropColumn(
                name: "client_approved",
                table: "service_order");
        }
    }
}
