using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{

public class VehicleConfiguration : BaseEntityConfiguration<Vehicle>
{
    public override void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.ToTable("vehicles");

        builder.HasKey(v => v.SerialNumber);

        builder.Property(v => v.SerialNumber)
            .HasColumnName("serial_number")
            .ValueGeneratedOnAdd(); // Equivalente a SERIAL

        builder.Property(v => v.VehicleModelId)
            .HasColumnName("id_model")
            .IsRequired();

        builder.Property(v => v.ClientId)
            .HasColumnName("id_client")
            .IsRequired();

                builder.Property(v => v.ReleaseYear)
                    .HasColumnName("release_year")
                    .IsRequired();

                builder.Property(v => v.Km)
                    .HasColumnName("km")
                    .IsRequired();

        builder.Property(v => v.FuelTypeId)
            .HasColumnName("id_fuel_type")
            .IsRequired();

        builder.Property(v => v.VehicleTypeId)
            .HasColumnName("id_vehicle_type")
            .IsRequired();

        builder.HasOne(v => v.Model)
            .WithMany(m => m.Vehicles)
            .HasForeignKey(v => v.VehicleModelId);

        builder.HasOne(v => v.Client)
            .WithMany(c => c.Vehicles)
            .HasForeignKey(v => v.ClientId);

        builder.HasOne(v => v.FuelType)
            .WithMany(f => f.Vehicles)
            .HasForeignKey(v => v.FuelTypeId);

        builder.HasOne(v => v.vehicleType)
            .WithMany(vt => vt.Vehicles)
            .HasForeignKey(v => v.VehicleTypeId);
    }
}
}
