using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{
public class ServiceTypeConfiguration : IEntityTypeConfiguration<ServiceType>
{
    public void Configure(EntityTypeBuilder<ServiceType> builder)
    {
        builder.ToTable("service_type");

        builder.HasKey(st => st.Id);

        builder.Property(st => st.Id)
            .HasColumnName("id");

        builder.Property(st => st.Description)
            .HasColumnName("description")
            .HasMaxLength(200)
            .IsRequired();

        builder.HasIndex(st => st.Description)
            .IsUnique();



        builder.HasMany(st => st.ServiceOrders)
            .WithOne(so => so.ServiceType)
            .HasForeignKey(so => so.ServiceTypeId);
    }
}
}