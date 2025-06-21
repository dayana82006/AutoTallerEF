using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUsername : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.RenameColumn(
                name: "updated_at",
                table: "user_member",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "created_at",
                table: "user_member",
                newName: "CreatedAt");

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

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "user_member",
                type: "timestamp with time zone",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone",
                oldDefaultValueSql: "NOW()");

            migrationBuilder.AddColumn<string>(
                name: "username",
                table: "user_member",
                type: "character varying(150)",
                maxLength: 150,
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "username",
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

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "UserMembers",
                newName: "updated_at");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "UserMembers",
                newName: "created_at");

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

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_at",
                table: "UserMembers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValueSql: "NOW()",
                oldClrType: typeof(DateTime),
                oldType: "timestamp with time zone");

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
    }
}
