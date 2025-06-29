using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{
public class ServiceStatusConfiguration : BaseEntityConfiguration<ServiceStatus>
{
    public override void Configure(EntityTypeBuilder<ServiceStatus> builder)
    {
        builder.ToTable("service_status");

        builder.HasKey(ss => ss.Id);

        builder.Property(ss => ss.Id)
            .HasColumnName("id");

        builder.Property(ss => ss.Name)
            .HasColumnName("name")
            .HasMaxLength(20)
            .IsRequired();

        builder.HasIndex(ss => ss.Name)
            .IsUnique();

        builder.HasMany(ss => ss.ServiceOrders)
            .WithOne(so => so.ServiceStatus)
            .HasForeignKey(so => so.ServiceStatusId);
    }
}

}