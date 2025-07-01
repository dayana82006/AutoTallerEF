using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{
public class SpareConfiguration : BaseEntityConfiguration<Spare>
{
    public override void Configure(EntityTypeBuilder<Spare> builder)
    {
        builder.ToTable("spares");

        builder.HasKey(s => s.Code);

        builder.Property(s => s.Code)
            .HasColumnName("code")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(s => s.Description)
            .HasColumnName("description")
            .HasMaxLength(200)
            .IsRequired(false);

        builder.Property(s => s.StockQuantity)
            .HasColumnName("stock_quantity")
            .IsRequired();

        builder.Property(s => s.UnitPrice)
            .HasColumnName("unit_price")
            .HasColumnType("decimal(10,2)")
            .IsRequired();

        builder.HasMany(s => s.OrderDetails)
            .WithOne(od => od.Spare)
            .HasForeignKey(od => od.SpareCode)
            .HasPrincipalKey(s => s.Code);
    }
}
}