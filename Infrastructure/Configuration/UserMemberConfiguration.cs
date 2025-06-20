using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{

public class UserMemberConfiguration : BaseEntityConfiguration<UserMember>
{
    public override void Configure(EntityTypeBuilder<UserMember> builder)
    {
        builder.ToTable("user_member");

        builder.HasKey(um => um.Id);

        builder.Property(um => um.Id)
            .HasColumnName("id");

        builder.Property(um => um.Name)
            .HasColumnName("name")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(um => um.Lastname)
            .HasColumnName("lastname")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(um => um.Email)
            .HasColumnName("email")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(um => um.Username)
            .HasColumnName("username")
            .HasMaxLength(150)
            .IsRequired();

        builder.HasIndex(um => um.Email)
            .IsUnique();

        builder.Property(um => um.Password)
            .HasColumnName("password")
            .HasMaxLength(100)
            .IsRequired();

        builder.HasMany(um => um.UserMembers)
            .WithOne(ur => ur.UserMember)
            .HasForeignKey(ur => ur.UserMemberId);

        builder.HasMany(um => um.ServiceOrders)
            .WithOne(so => so.UserMember)
            .HasForeignKey(so => so.UserMemberId);
    }
}
}