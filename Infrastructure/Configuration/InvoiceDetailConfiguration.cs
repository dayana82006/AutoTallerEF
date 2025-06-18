using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{
public class InvoiceDetailConfiguration : IEntityTypeConfiguration<InvoiceDetail>
{
    public void Configure(EntityTypeBuilder<InvoiceDetail> builder)
    {
        builder.ToTable("invoice_details");

        builder.HasKey(d => d.Id);

        builder.Property(d => d.Id)
            .HasColumnName("id");

        builder.Property(d => d.InvoiceId)
            .HasColumnName("id_invoice")
            .IsRequired();

        builder.Property(d => d.ServiceOrderId)
            .HasColumnName("id_service_order")
            .IsRequired();

        builder.HasOne(d => d.Invoice)
            .WithMany(i => i.InvoiceDetails)
            .HasForeignKey(d => d.InvoiceId);

        builder.HasOne(d => d.ServiceOrder)
            .WithMany(so => so.InvoiceDetails)
            .HasForeignKey(d => d.ServiceOrderId);
    }
}

}