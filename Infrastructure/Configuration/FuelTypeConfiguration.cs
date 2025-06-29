using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class FuelTypeConfiguration : BaseEntityConfiguration<FuelType>
    {
        public override void Configure(EntityTypeBuilder<FuelType> builder)
        {
            builder.ToTable("fuel_type");

            builder.HasKey(f => f.Id);

            builder.Property(f => f.Id)
                .HasColumnName("id");

            builder.Property(f => f.Name)
                .HasColumnName("name")
                .HasMaxLength(150)
                .IsRequired();

            builder.HasIndex(f => f.Name)
                .IsUnique();
        }
    }
}