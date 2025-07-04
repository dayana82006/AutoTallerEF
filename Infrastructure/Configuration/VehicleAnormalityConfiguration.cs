using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
public class VehicleAnormalityConfiguration : BaseEntityConfiguration<VehicleAnormality>
{
    public override void Configure(EntityTypeBuilder<VehicleAnormality> builder)
    {
        builder.ToTable("vehicle_anormalities");

        builder.HasKey(va => va.Id);

        builder.Property(va => va.Id)
            .HasColumnName("id");

        builder.Property(va => va.Name)
            .HasColumnName("name")
            .HasMaxLength(100)
            .IsRequired();
        builder.Property(e => e.EntryDate)
            .HasColumnName("entry_date")
            .HasDefaultValueSql("NOW()");
        builder.HasIndex(va => va.Name)
            .IsUnique();
    }
}

}