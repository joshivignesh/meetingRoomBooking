using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConferenceRoomBooking.Models
{
    public class meetingDBContext : DbContext
    {
        public virtual DbSet<tblMeetings> tblMeetings { get; set; }
        public virtual DbSet<tblEmployees> tblEmployees { get; set; }

        //public virtual DbSet<tblEmployeeMeeting> tblEmployeeMeeting { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=MeetingManagementSystem;Data Source=DESKTOP-76BTI7C\SQLEXPRESS;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<tblMeetings>(entity =>
            {
                entity.HasKey(e => e.MeetingID);

                entity.ToTable("tblMeeting");

                //entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.MeetingName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MeetingStartDate)
                   .IsRequired()
                   .HasMaxLength(20)
                   .IsUnicode(false);

                entity.Property(e => e.MeetingendDate)
                   .IsRequired()
                   .HasMaxLength(20)
                   .IsUnicode(false);
            });

            modelBuilder.Entity<tblEmployees>(entity =>
            {
                entity.HasKey(e => e.EmployeeID);

                entity.ToTable("tblEmployee");

                entity.Property(e => e.EmployeeID).HasColumnName("EmployeeID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.MeetingName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.IsAdmin)
                    .IsUnicode(false);
            });
        }
    }
}
