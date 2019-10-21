﻿// <auto-generated />
using System;
using AngularLovelyjubbly.Data.Sql.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AngularLovelyjubbly.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.ApplicationRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Coach", b =>
                {
                    b.Property<int>("CoachId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CoachName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("CoachNameShort")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.HasKey("CoachId");

                    b.ToTable("Coaches");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Country", b =>
                {
                    b.Property<int>("CountryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CountryNameEn")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("CountryNameFi")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("CountryId");

                    b.ToTable("Countries");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.DefensivePlay", b =>
                {
                    b.Property<int>("DefensivePlayId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DefensivePlayName")
                        .IsRequired()
                        .IsFixedLength(true)
                        .HasMaxLength(2);

                    b.HasKey("DefensivePlayId");

                    b.ToTable("DefensivePlays");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Division", b =>
                {
                    b.Property<int>("DivisionId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DivisionName")
                        .IsRequired()
                        .HasMaxLength(15);

                    b.HasKey("DivisionId");

                    b.ToTable("Divisions");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Fixture", b =>
                {
                    b.Property<int>("FixtureId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AwayTeamId");

                    b.Property<byte?>("AwayTeamScore");

                    b.Property<int>("HomeTeamId");

                    b.Property<byte?>("HomeTeamScore");

                    b.Property<bool>("IsOvertime")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("0");

                    b.Property<int>("TournamentId");

                    b.Property<int>("WeekId");

                    b.HasKey("FixtureId");

                    b.HasIndex("AwayTeamId");

                    b.HasIndex("HomeTeamId");

                    b.HasIndex("TournamentId");

                    b.HasIndex("WeekId");

                    b.ToTable("Fixtures");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Formation", b =>
                {
                    b.Property<int>("FormationId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FormationName")
                        .IsRequired()
                        .HasConversion(new ValueConverter<string, string>(v => default(string), v => default(string), new ConverterMappingHints(size: 1)))
                        .IsFixedLength(true)
                        .HasMaxLength(1);

                    b.HasKey("FormationId");

                    b.ToTable("Formations");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Gender", b =>
                {
                    b.Property<int>("GenderId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("GenderDescription")
                        .IsRequired()
                        .HasMaxLength(10);

                    b.HasKey("GenderId");

                    b.ToTable("Genders");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Language", b =>
                {
                    b.Property<int>("LanguageId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LanguageName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("LanguageId");

                    b.ToTable("Languages");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.OffensivePlay", b =>
                {
                    b.Property<int>("OffensivePlayId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("OffensivePlayName")
                        .IsRequired()
                        .IsFixedLength(true)
                        .HasMaxLength(2);

                    b.HasKey("OffensivePlayId");

                    b.ToTable("OffensivePlays");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.PlayResult", b =>
                {
                    b.Property<int>("PlayResultId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DefensivePlayId");

                    b.Property<int>("FormationId");

                    b.Property<bool>("IsDefensivePenalty")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("0");

                    b.Property<bool>("IsFumble")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("0");

                    b.Property<bool>("IsInterception")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("0");

                    b.Property<bool>("IsOffensivePenalty")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("0");

                    b.Property<bool>("IsSack")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("0");

                    b.Property<string>("Notes");

                    b.Property<int>("OffensivePlayId");

                    b.Property<int>("ReturnYards");

                    b.Property<int>("Yards");

                    b.HasKey("PlayResultId");

                    b.HasIndex("DefensivePlayId");

                    b.HasIndex("FormationId");

                    b.HasIndex("OffensivePlayId");

                    b.ToTable("PlayResults");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.PowerRanking", b =>
                {
                    b.Property<int>("PowerRankingId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte>("CurrentRanking");

                    b.Property<byte>("PreviousRanking");

                    b.Property<int>("TeamId");

                    b.Property<int>("TournamentId");

                    b.Property<int>("WeekId");

                    b.HasKey("PowerRankingId");

                    b.HasIndex("TeamId");

                    b.HasIndex("TournamentId");

                    b.HasIndex("WeekId");

                    b.ToTable("PowerRankings");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.QBRating", b =>
                {
                    b.Property<int>("QBRatingId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Completion");

                    b.Property<double>("Gain");

                    b.Property<double>("Interception");

                    b.Property<int>("TeamId");

                    b.Property<double>("Touchdown");

                    b.Property<int>("TournamentId");

                    b.HasKey("QBRatingId");

                    b.HasIndex("TeamId");

                    b.HasIndex("TournamentId");

                    b.ToTable("QBRatings");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Record", b =>
                {
                    b.Property<int>("RecordId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CoachId");

                    b.Property<string>("Comments");

                    b.Property<byte>("Rank");

                    b.Property<double>("RecordAmount");

                    b.Property<int>("RecordCategoryId");

                    b.Property<string>("RecordImage")
                        .IsRequired();

                    b.Property<int>("SeasonId");

                    b.Property<int>("TeamId");

                    b.Property<int?>("WeekId");

                    b.HasKey("RecordId");

                    b.HasIndex("CoachId");

                    b.HasIndex("RecordCategoryId");

                    b.HasIndex("SeasonId");

                    b.HasIndex("TeamId");

                    b.HasIndex("WeekId");

                    b.ToTable("Records");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.RecordCategory", b =>
                {
                    b.Property<int>("RecordCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsPerSeason")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("1");

                    b.Property<string>("RecordCategoryName")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("RecordCategoryId");

                    b.ToTable("RecordCategories");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.RefreshToken", b =>
                {
                    b.Property<Guid>("RefreshTokenId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("EndDate");

                    b.Property<bool>("IsEnabled");

                    b.Property<DateTime>("StartDate");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("RefreshTokenId");

                    b.HasIndex("UserId");

                    b.ToTable("RefreshTokens");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.RegularSeasonWins", b =>
                {
                    b.Property<int>("RegularSeasonWinsId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("TeamId");

                    b.Property<int>("TournamentId");

                    b.Property<decimal>("Wins");

                    b.HasKey("RegularSeasonWinsId");

                    b.HasIndex("TeamId");

                    b.HasIndex("TournamentId");

                    b.ToTable("RegularSeasonWins");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Score", b =>
                {
                    b.Property<int>("ScoreId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ScoreDescription")
                        .IsRequired()
                        .HasMaxLength(75);

                    b.Property<int>("WeekId");

                    b.HasKey("ScoreId");

                    b.HasIndex("WeekId");

                    b.ToTable("Scores");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Season", b =>
                {
                    b.Property<int>("SeasonId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("SeasonName")
                        .IsRequired()
                        .HasMaxLength(4);

                    b.HasKey("SeasonId");

                    b.ToTable("Seasons");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.SuperbowlOdds", b =>
                {
                    b.Property<int>("SuperbowlOddsId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte>("Odds");

                    b.Property<int>("TeamId");

                    b.Property<int>("TournamentId");

                    b.HasKey("SuperbowlOddsId");

                    b.HasIndex("TeamId");

                    b.HasIndex("TournamentId");

                    b.ToTable("SuperbowlOdds");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Team", b =>
                {
                    b.Property<int>("TeamId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("B");

                    b.Property<string>("CheerleaderImage");

                    b.Property<int>("CoachId");

                    b.Property<string>("CoachImage");

                    b.Property<int>("DivisionId");

                    b.Property<int>("G");

                    b.Property<string>("HeaderImage");

                    b.Property<string>("Hex")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasDefaultValue("");

                    b.Property<string>("LogoImage");

                    b.Property<int>("R");

                    b.Property<string>("TeamName")
                        .IsRequired()
                        .HasMaxLength(75);

                    b.Property<string>("TeamNameShort")
                        .IsRequired()
                        .HasMaxLength(15);

                    b.HasKey("TeamId");

                    b.HasIndex("CoachId");

                    b.HasIndex("DivisionId");

                    b.ToTable("Teams");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Tournament", b =>
                {
                    b.Property<int>("TournamentId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("SeasonId");

                    b.Property<string>("TournamentName")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("TournamentId");

                    b.HasIndex("SeasonId");

                    b.ToTable("Tournaments");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.TurnoverDifferential", b =>
                {
                    b.Property<int>("TurnoverDifferentialId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FumbleGiveaways");

                    b.Property<int>("FumbleTakeaways");

                    b.Property<int>("InterceptionGiveaways");

                    b.Property<int>("InterceptionTakeaways");

                    b.Property<int>("TeamId");

                    b.Property<int>("TournamentId");

                    b.HasKey("TurnoverDifferentialId");

                    b.HasIndex("TeamId");

                    b.HasIndex("TournamentId");

                    b.ToTable("TurnoverDifferentials");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.UserProfile", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<DateTime?>("BirthDate");

                    b.Property<int?>("CountryId");

                    b.Property<string>("FirstName")
                        .HasMaxLength(60);

                    b.Property<int?>("GenderId");

                    b.Property<int?>("LanguageId");

                    b.Property<DateTime>("RegistrationDate");

                    b.Property<string>("Surname")
                        .HasMaxLength(100);

                    b.Property<byte[]>("Timestamp")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.HasKey("UserId");

                    b.HasIndex("CountryId");

                    b.HasIndex("GenderId");

                    b.HasIndex("LanguageId");

                    b.ToTable("AspNetUserProfiles");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Week", b =>
                {
                    b.Property<int>("WeekId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("WeekNumber")
                        .IsRequired();

                    b.HasKey("WeekId");

                    b.ToTable("Weeks");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Yardage", b =>
                {
                    b.Property<int>("YardageId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("DefensePassingYards");

                    b.Property<int>("DefenseRushingYards");

                    b.Property<int>("DefenseTotalYards");

                    b.Property<int>("OffensePassingYards");

                    b.Property<int>("OffenseRushingYards");

                    b.Property<int>("OffenseTotalYards");

                    b.Property<int>("TeamId");

                    b.Property<int>("TournamentId");

                    b.HasKey("YardageId");

                    b.HasIndex("TeamId");

                    b.HasIndex("TournamentId");

                    b.ToTable("Yardages");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Fixture", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Team", "AwayTeam")
                        .WithMany()
                        .HasForeignKey("AwayTeamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Team", "HomeTeam")
                        .WithMany()
                        .HasForeignKey("HomeTeamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Tournament", "Tournament")
                        .WithMany()
                        .HasForeignKey("TournamentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Week", "Week")
                        .WithMany()
                        .HasForeignKey("WeekId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.PlayResult", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.DefensivePlay", "DefensivePlay")
                        .WithMany()
                        .HasForeignKey("DefensivePlayId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Formation", "Formation")
                        .WithMany()
                        .HasForeignKey("FormationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.OffensivePlay", "OffensivePlay")
                        .WithMany()
                        .HasForeignKey("OffensivePlayId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.PowerRanking", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Tournament", "Tournament")
                        .WithMany()
                        .HasForeignKey("TournamentId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Week", "Week")
                        .WithMany()
                        .HasForeignKey("WeekId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.QBRating", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Tournament", "Tournament")
                        .WithMany()
                        .HasForeignKey("TournamentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Record", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Coach", "Coach")
                        .WithMany()
                        .HasForeignKey("CoachId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.RecordCategory", "RecordCategory")
                        .WithMany()
                        .HasForeignKey("RecordCategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Season", "Season")
                        .WithMany()
                        .HasForeignKey("SeasonId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Week", "Week")
                        .WithMany()
                        .HasForeignKey("WeekId");
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.RefreshToken", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.RegularSeasonWins", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Tournament", "Tournament")
                        .WithMany()
                        .HasForeignKey("TournamentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Score", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Week", "Week")
                        .WithMany()
                        .HasForeignKey("WeekId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.SuperbowlOdds", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Tournament", "Tournament")
                        .WithMany()
                        .HasForeignKey("TournamentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Team", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Coach", "Coach")
                        .WithMany()
                        .HasForeignKey("CoachId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Division", "Division")
                        .WithMany()
                        .HasForeignKey("DivisionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Tournament", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Season", "Season")
                        .WithMany()
                        .HasForeignKey("SeasonId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.TurnoverDifferential", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Tournament", "Tournament")
                        .WithMany()
                        .HasForeignKey("TournamentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.UserProfile", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Country", "Country")
                        .WithMany()
                        .HasForeignKey("CountryId");

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Gender", "Gender")
                        .WithMany()
                        .HasForeignKey("GenderId");

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Language", "Language")
                        .WithMany()
                        .HasForeignKey("LanguageId");

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.ApplicationUser", "User")
                        .WithOne("UserProfile")
                        .HasForeignKey("AngularLovelyjubbly.Data.Sql.Models.UserProfile", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AngularLovelyjubbly.Data.Sql.Models.Yardage", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Team", "Team")
                        .WithMany()
                        .HasForeignKey("TeamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.Tournament", "Tournament")
                        .WithMany()
                        .HasForeignKey("TournamentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.ApplicationRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.ApplicationRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("AngularLovelyjubbly.Data.Sql.Models.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
