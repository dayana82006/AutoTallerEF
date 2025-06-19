using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{
public class ServiceOrderConfiguration : IEntityTypeConfiguration<ServiceOrder>
{
    public void Configure(EntityTypeBuilder<ServiceOrder> builder)
    {
        builder.ToTable("service_order");

        builder.HasKey(so => so.Id);

        builder.Property(so => so.Id)
            .HasColumnName("id");

        builder.Property(so => so.VehicleSerialNumber)
            .HasColumnName("serial_number")
            .IsRequired();

        builder.Property(so => so.ServiceTypeId)
            .HasColumnName("id_service_type")
            .IsRequired();

        builder.Property(so => so.UserMemberId)
            .HasColumnName("id_user_member")
            .IsRequired();

        builder.Property(s => s.ApprovedByClient)
            .HasColumnName("client_approved")
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(so => so.ServiceStatusId)
            .HasColumnName("id_status")
            .IsRequired();

        builder.Property(so => so.Description)
            .HasColumnName("description")
            .HasColumnType("text");

        builder.Property(so => so.DateEntry)
            .HasColumnName("date_entry")
            .HasColumnType("timestamp")
            .IsRequired();
        
        builder.Property(st => st.UnitPrice)
            .HasColumnName("unit_price")
            .HasColumnType("decimal(10,2)")
            .IsRequired();

        builder.Property(so => so.DeliveryDate)
            .HasColumnName("delivery_date")
            .HasColumnType("timestamp");

        builder.HasOne(so => so.Vehicle)
            .WithMany(v => v.ServiceOrders)
            .HasForeignKey(so => so.VehicleSerialNumber)
            .HasPrincipalKey(v => v.SerialNumber);

        builder.HasOne(so => so.ServiceType)
            .WithMany(st => st.ServiceOrders)
            .HasForeignKey(so => so.ServiceTypeId);

        builder.HasOne(so => so.UserMember)
            .WithMany(um => um.ServiceOrders)
            .HasForeignKey(so => so.UserMemberId);

        builder.HasOne(so => so.ServiceStatus)
            .WithMany(ss => ss.ServiceOrders)
            .HasForeignKey(so => so.ServiceStatusId);

        builder.HasMany(so => so.OrderDetails)
            .WithOne(od => od.ServiceOrder)
            .HasForeignKey(od => od.ServiceOrderId);

        builder.HasMany(so => so.InvoiceDetails)
            .WithOne(id => id.ServiceOrder)
            .HasForeignKey(id => id.ServiceOrderId);
    }
}
}