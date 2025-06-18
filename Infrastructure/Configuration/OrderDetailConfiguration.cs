using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{
public class OrderDetailConfiguration : IEntityTypeConfiguration<OrderDetail>
{
    public void Configure(EntityTypeBuilder<OrderDetail> builder)
    {
        builder.ToTable("order_details");

        builder.HasKey(od => od.Id);

        builder.Property(od => od.Id)
            .HasColumnName("id");

        builder.Property(od => od.ServiceOrderId)
            .HasColumnName("id_service_order")
            .IsRequired();

        builder.Property(od => od.SpareCode)
            .HasColumnName("code_spare")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(od => od.SpareQuantity)
            .HasColumnName("spare_quantity")
            .IsRequired();

        builder.HasOne(od => od.ServiceOrder)
            .WithMany(so => so.OrderDetails)
            .HasForeignKey(od => od.ServiceOrderId);

        builder.HasOne(od => od.Spare)
            .WithMany(s => s.OrderDetails)
            .HasForeignKey(od => od.SpareCode)
            .HasPrincipalKey(s => s.Code); 
    }
}
}