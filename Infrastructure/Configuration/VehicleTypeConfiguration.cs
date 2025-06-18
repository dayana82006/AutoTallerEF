using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
public class VehicleTypeConfiguration : IEntityTypeConfiguration<VehicleType>
{
    public void Configure(EntityTypeBuilder<VehicleType> builder)
    {
        builder.ToTable("vehicle_type");

        builder.HasKey(vt => vt.Id);

        builder.Property(vt => vt.Id)
            .HasColumnName("id");

        builder.Property(vt => vt.Name)
            .HasColumnName("name")
            .HasMaxLength(150)
            .IsRequired();

        builder.HasIndex(vt => vt.Name)
            .IsUnique();
    }
}
}