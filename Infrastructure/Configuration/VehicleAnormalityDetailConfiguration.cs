using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
public class VehicleAnormalityDetailConfiguration : IEntityTypeConfiguration<VehicleAnormalityDetail>
{
    public void Configure(EntityTypeBuilder<VehicleAnormalityDetail> builder)
    {
        builder.ToTable("vehicle_anormalities_details");

        builder.HasKey(vad => vad.Id);

        builder.Property(vad => vad.Id)
            .HasColumnName("id");

        builder.Property(vad => vad.IdAnormality)
            .HasColumnName("id_anormality")
            .IsRequired();

        builder.Property(vad => vad.SerialNumber)
            .HasColumnName("serial_number")
            .IsRequired();

        builder.HasOne(vad => vad.VehicleAnormality)
            .WithMany(va => va.VehicleAnormalityDetails)
            .HasForeignKey(vad => vad.IdAnormality);

        builder.HasOne(vad => vad.Vehicle)
            .WithMany(v => v.VehicleAnormalityDetails)
            .HasForeignKey(vad => vad.SerialNumber);
    }
}
}