using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class baseEntityfirst : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_service_order_user_member_id_user_member",
                table: "service_order");

            migrationBuilder.DropForeignKey(
                name: "FK_user_role_user_member_id_user_member",
                table: "user_role");

            migrationBuilder.DropForeignKey(
                name: "FK_user_specialties_user_member_id_user",
                table: "user_specialties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_user_member",
                table: "user_member");

            migrationBuilder.DropIndex(
                name: "IX_user_member_email",
                table: "user_member");

            migrationBuilder.RenameTable(
                name: "user_member",
                newName: "UserMembers");

            migrationBuilder.RenameColumn(
                name: "password",
                table: "UserMembers",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "UserMembers",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "lastname",
                table: "UserMembers",
                newName: "Lastname");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "UserMembers",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "UserMembers",
                newName: "Id");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "vehicles",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "vehicles",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "vehicle_type",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "vehicle_type",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "vehicle_models",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "vehicle_models",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "vehicle_anormalities_details",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "vehicle_anormalities_details",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "vehicle_anormalities",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "vehicle_anormalities",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "user_specialties",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "user_specialties",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "user_role",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "user_role",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "specialties",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "specialties",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "spares",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "spares",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "service_type",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "service_type",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "service_status",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "service_status",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "service_order",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "service_order",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "roles",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "roles",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "order_details",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "order_details",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "invoices",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "invoices",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "invoice_details",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "invoice_details",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "fuel_type",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "fuel_type",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "clients",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "clients",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "brands",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "brands",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "UserMembers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "UserMembers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Lastname",
                table: "UserMembers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "UserMembers",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<DateTime>(
                name: "created_at",
                table: "UserMembers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "NOW()");

            migrationBuilder.AddColumn<DateTime>(
                name: "updated_at",
                table: "UserMembers",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserMembers",
                table: "UserMembers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_service_order_UserMembers_id_user_member",
                table: "service_order",
                column: "id_user_member",
                principalTable: "UserMembers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_role_UserMembers_id_user_member",
                table: "user_role",
                column: "id_user_member",
                principalTable: "UserMembers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_specialties_UserMembers_id_user",
                table: "user_specialties",
                column: "id_user",
                principalTable: "UserMembers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_service_order_UserMembers_id_user_member",
                table: "service_order");

            migrationBuilder.DropForeignKey(
                name: "FK_user_role_UserMembers_id_user_member",
                table: "user_role");

            migrationBuilder.DropForeignKey(
                name: "FK_user_specialties_UserMembers_id_user",
                table: "user_specialties");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserMembers",
                table: "UserMembers");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "vehicles");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "vehicles");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "vehicle_type");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "vehicle_type");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "vehicle_models");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "vehicle_models");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "vehicle_anormalities_details");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "vehicle_anormalities_details");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "vehicle_anormalities");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "vehicle_anormalities");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "user_specialties");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "user_specialties");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "user_role");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "user_role");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "specialties");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "specialties");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "spares");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "spares");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "service_type");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "service_type");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "service_status");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "service_status");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "service_order");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "service_order");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "roles");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "roles");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "order_details");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "order_details");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "invoices");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "invoices");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "invoice_details");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "invoice_details");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "fuel_type");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "fuel_type");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "clients");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "clients");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "brands");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "brands");

            migrationBuilder.DropColumn(
                name: "created_at",
                table: "UserMembers");

            migrationBuilder.DropColumn(
                name: "updated_at",
                table: "UserMembers");

            migrationBuilder.RenameTable(
                name: "UserMembers",
                newName: "user_member");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "user_member",
                newName: "password");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "user_member",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Lastname",
                table: "user_member",
                newName: "lastname");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "user_member",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "user_member",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "password",
                table: "user_member",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "user_member",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "lastname",
                table: "user_member",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "user_member",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_user_member",
                table: "user_member",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_user_member_email",
                table: "user_member",
                column: "email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_service_order_user_member_id_user_member",
                table: "service_order",
                column: "id_user_member",
                principalTable: "user_member",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_role_user_member_id_user_member",
                table: "user_role",
                column: "id_user_member",
                principalTable: "user_member",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_user_specialties_user_member_id_user",
                table: "user_specialties",
                column: "id_user",
                principalTable: "user_member",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
