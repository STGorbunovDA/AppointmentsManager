using AppointmentsManager.Data.Models;
using System.Collections.Generic;

namespace AppointmentsManager.Data
{
    //Add-Migration -Name Initial -OutputDir "Data/Migrations"
    //Update-Database
    public class AppDbContext : DbContext
    {
        public DbSet<Appointment> Appointments { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
    }
}
