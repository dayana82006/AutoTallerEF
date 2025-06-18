using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class BrandConfiguration: IEntityTypeConfiguration<Brand>
    {
            public void Configure(EntityTypeBuilder<Brand> builder)
    {
        builder.ToTable("brands");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.Id)
            .HasColumnName("id");

        builder.Property(b => b.Name)
            .HasColumnName("name")
            .HasMaxLength(120)
            .IsRequired();

        builder.HasIndex(b => b.Name)
            .IsUnique();

        builder.HasMany(b => b.VehicleModels)
            .WithOne(vm => vm.Brand)
            .HasForeignKey(vm => vm.BrandId);
    }
    }
}