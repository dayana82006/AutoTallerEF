using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{
public class VehicleConfiguration : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.ToTable("vehicles");

        builder.HasKey(v => v.SerialNumber);

        builder.Property(v => v.SerialNumber)
            .HasColumnName("serial_number")
            .IsRequired();

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

        builder.HasOne(v => v.Model)
            .WithMany(vm => vm.Vehicles)
            .HasForeignKey(v => v.VehicleModelId);

        builder.HasOne(v => v.Client)
            .WithMany(c => c.Vehicles)
            .HasForeignKey(v => v.ClientId);

        builder.HasMany(v => v.ServiceOrders)
            .WithOne(so => so.Vehicle)
            .HasForeignKey(so => so.VehicleSerialNumber)
            .HasPrincipalKey(v => v.SerialNumber);
    }
}
}