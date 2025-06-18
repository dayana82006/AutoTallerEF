using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{
public class InvoiceConfiguration : IEntityTypeConfiguration<Invoice>
{
    public void Configure(EntityTypeBuilder<Invoice> builder)
    {
        builder.ToTable("invoices");

        builder.HasKey(i => i.Id);

        builder.Property(i => i.Id)
            .HasColumnName("id");

        builder.Property(i => i.ClientId)
            .HasColumnName("id_client")
            .IsRequired();

        builder.Property(i => i.TotalSpares)
            .HasColumnName("total_spares")
            .HasColumnType("decimal(12,2)")
            .IsRequired();

        builder.Property(i => i.TotalServices)
            .HasColumnName("total_services")
            .HasColumnType("decimal(12,2)")
            .IsRequired();

        builder.Property(i => i.FinalAmount)
            .HasColumnName("final_amount")
            .HasColumnType("decimal(12,2)")
            .IsRequired();

        builder.HasOne(i => i.Client)
            .WithMany(c => c.Invoices)
            .HasForeignKey(i => i.ClientId);

        builder.HasMany(i => i.InvoiceDetails)
            .WithOne(d => d.Invoice)
            .HasForeignKey(d => d.InvoiceId);
    }
}
}