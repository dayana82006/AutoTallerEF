using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
public class UserSpecialtyConfiguration : IEntityTypeConfiguration<UserSpecialty>
{
    public void Configure(EntityTypeBuilder<UserSpecialty> builder)
    {
        builder.ToTable("user_specialties");

        builder.HasKey(us => us.Id);

        builder.Property(us => us.Id)
            .HasColumnName("id");

        builder.Property(us => us.IdUser)
            .HasColumnName("id_user")
            .IsRequired();

        builder.Property(us => us.IdSpecialty)
            .HasColumnName("id_specialty")
            .IsRequired();

        builder.HasOne(us => us.User)
            .WithMany(u => u.UserSpecialties)
            .HasForeignKey(us => us.IdUser);

        builder.HasOne(us => us.Specialty)
            .WithMany(s => s.UserSpecialties)
            .HasForeignKey(us => us.IdSpecialty);
    }
}
}