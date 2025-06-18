using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{
public class VehicleModelConfiguration : IEntityTypeConfiguration<VehicleModel>
{
    public void Configure(EntityTypeBuilder<VehicleModel> builder)
    {
        builder.ToTable("vehicle_models");

        builder.HasKey(vm => vm.Id);

        builder.Property(vm => vm.Id)
            .HasColumnName("id");

        builder.Property(vm => vm.BrandId)
            .HasColumnName("id_brand")
            .IsRequired();

        builder.Property(vm => vm.Name)
            .HasColumnName("name")
            .HasMaxLength(120)
            .IsRequired();

        builder.HasIndex(vm => vm.Name)
            .IsUnique();

        builder.HasOne(vm => vm.Brand)
            .WithMany(b => b.VehicleModels)
            .HasForeignKey(vm => vm.BrandId);

        builder.HasMany(vm => vm.Vehicles)
            .WithOne(v => v.Model)
            .HasForeignKey(v => v.VehicleModelId);
    }
}
}