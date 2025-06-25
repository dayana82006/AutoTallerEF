using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities;

namespace Infrastructure.Configuration
{
public class UserRoleConfiguration : BaseEntityConfiguration<UserRole>
{
    public override void Configure(EntityTypeBuilder<UserRole> builder)
    {
        builder.ToTable("user_role");

        builder.HasKey(ur => ur.Id);

        builder.Property(ur => ur.Id)
            .HasColumnName("id");

        builder.Property(ur => ur.UserMemberId)
            .HasColumnName("id_user_member")
            .IsRequired();

        builder.Property(ur => ur.RoleId)
            .HasColumnName("id_role")
            .IsRequired();

        builder.HasOne(ur => ur.UserMember)
            .WithMany(um => um.UserRoles)
            .HasForeignKey(ur => ur.UserMemberId);

        builder.HasOne(ur => ur.Role)
            .WithMany(r => r.UserMembers)
            .HasForeignKey(ur => ur.RoleId);
    }
}
}