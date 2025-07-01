using System.Reflection;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class PublicDbContext : DbContext
{
    public PublicDbContext(DbContextOptions<PublicDbContext> options) : base(options) { }
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Client> Clients { get; set; }
    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<InvoiceDetail> InvoiceDetails { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<ServiceOrder> ServiceOrders { get; set; }
    public DbSet<ServiceStatus> ServiceStatuses { get; set; }
    public DbSet<ServiceType> ServiceTypes { get; set; }
    public DbSet<Spare> Spares { get; set; }
    public DbSet<UserMember> UserMembers { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    public DbSet<VehicleModel> VehicleModels { get; set; }
    public DbSet<VehicleAnormality> VehicleAnormalities { get; set; }
    public DbSet<VehicleAnormalityDetail> VehicleAnormalityDetails { get; set; }
    public DbSet<FuelType> FuelTypes { get; set; }
    public DbSet<VehicleType> VehicleTypes { get; set; }
    public DbSet<Specialty> Specialties { get; set; }
    public DbSet<UserSpecialty> UserSpecialties { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserMember).Assembly);
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties().Where(p => p.ClrType == typeof(DateTime)))
            {
                property.SetColumnType("timestamp with time zone");
            }
        }



    }
    public override int SaveChanges()
{
    var entries = ChangeTracker.Entries<BaseEntity>();
    var utcNow = DateTime.UtcNow;

    foreach (var entry in entries)
    {
        if (entry.State == EntityState.Added)
        {
            entry.Entity.CreatedAt = utcNow;
        }

        if (entry.State == EntityState.Modified)
        {
            entry.Entity.UpdatedAt = utcNow;
        }
    }

    return base.SaveChanges();
}
public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
{
    var entries = ChangeTracker.Entries<BaseEntity>();
    var utcNow = DateTime.UtcNow;

    foreach (var entry in entries)
    {
        if (entry.State == EntityState.Added)
        {
            entry.Entity.CreatedAt = utcNow;
        }

        if (entry.State == EntityState.Modified)
        {
            entry.Entity.UpdatedAt = utcNow;
        }
    }

    return await base.SaveChangesAsync(cancellationToken);
}

}
