using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ThirdMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "unit_price",
                table: "service_type");

            migrationBuilder.AddColumn<DateTime>(
                name: "entry_date",
                table: "vehicle_anormalities",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "NOW()");

            migrationBuilder.AddColumn<decimal>(
                name: "unit_price",
                table: "service_order",
                type: "numeric(10,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "entry_date",
                table: "vehicle_anormalities");

            migrationBuilder.DropColumn(
                name: "unit_price",
                table: "service_order");

            migrationBuilder.AddColumn<decimal>(
                name: "unit_price",
                table: "service_type",
                type: "numeric(10,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
