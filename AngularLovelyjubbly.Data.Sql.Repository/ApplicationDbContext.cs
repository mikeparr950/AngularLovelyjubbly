using AngularLovelyjubbly.Data.Sql.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<Season> Seasons { get; set; }
        public DbSet<Week> Weeks { get; set; }
        public DbSet<Division> Divisions { get; set; }
        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<Coach> Coaches { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Fixture> Fixtures { get; set; }
        public DbSet<QBRating> QBRatings { get; set; }
        public DbSet<Yardage> Yardages { get; set; }
        public DbSet<RegularSeasonWins> RegularSeasonWins { get; set; }
        public DbSet<PowerRanking> PowerRankings { get; set; }
        public DbSet<TurnoverDifferential> TurnoverDifferentials { get; set; }
        public DbSet<SuperbowlOdds> SuperbowlOdds { get; set; }
        public DbSet<RecordCategory> RecordCategories { get; set; }
        public DbSet<Record> Records { get; set; }
        public DbSet<Score> Scores { get; set; }
        public DbSet<Formation> Formations { get; set; }
        public DbSet<OffensivePlay> OffensivePlays { get; set; }
        public DbSet<DefensivePlay> DefensivePlays { get; set; }
        public DbSet<PlayResult> PlayResults { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        //where is the db connection string coming from and how is this setup in startup and program.cs
        //handling of users, logins etc

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //Country
            builder.Entity<Country>().ToTable("Countries");
            builder.Entity<Country>().HasKey(c => c.CountryId);
            //translates to non-nullable
            builder.Entity<Country>().Property(c => c.CountryNameEn).IsRequired().HasMaxLength(50);
            builder.Entity<Country>().Property(c => c.CountryNameFi).IsRequired().HasMaxLength(50);

            //Language
            builder.Entity<Language>().ToTable("Languages");
            builder.Entity<Language>().HasKey(l => l.LanguageId);
            builder.Entity<Language>().Property(l => l.LanguageName).IsRequired().HasMaxLength(50);

            //Gender
            builder.Entity<Gender>().ToTable("Genders");
            builder.Entity<Gender>().HasKey(g => g.GenderId);
            builder.Entity<Gender>().Property(g => g.GenderDescription).IsRequired().HasMaxLength(10);

            //Season
            builder.Entity<Season>().ToTable("Seasons");
            builder.Entity<Season>().HasKey(s => s.SeasonId);
            builder.Entity<Season>().Property(s => s.SeasonName).IsRequired().HasMaxLength(4);

            //Week
            builder.Entity<Week>().ToTable("Weeks");
            builder.Entity<Week>().HasKey(w => w.WeekId);
            builder.Entity<Week>().Property(w => w.WeekNumber).IsRequired();

            //Division
            builder.Entity<Division>().ToTable("Divisions");
            builder.Entity<Division>().HasKey(d => d.DivisionId);
            builder.Entity<Division>().Property(d => d.DivisionName).IsRequired().HasMaxLength(15);

            //Tournament
            builder.Entity<Tournament>().ToTable("Tournaments");
            builder.Entity<Tournament>().HasKey(t => t.TournamentId);
            builder.Entity<Tournament>().Property(t => t.TournamentName).IsRequired().HasMaxLength(100);
            builder.Entity<Tournament>().Property(t => t.SeasonId).IsRequired();

            //Coach
            builder.Entity<Coach>().ToTable("Coaches");
            builder.Entity<Coach>().HasKey(c => c.CoachId);
            builder.Entity<Coach>().Property(c => c.CoachName).IsRequired().HasMaxLength(50);
            builder.Entity<Coach>().Property(c => c.CoachNameShort).IsRequired().HasMaxLength(20);

            //Team
            builder.Entity<Team>().ToTable("Teams");
            builder.Entity<Team>().HasKey(t => t.TeamId);
            builder.Entity<Team>().Property(t => t.TeamName).IsRequired().HasMaxLength(75);
            builder.Entity<Team>().Property(t => t.TeamNameShort).IsRequired().HasMaxLength(15);
            builder.Entity<Team>().Property(t => t.CoachId).IsRequired();
            builder.Entity<Team>().Property(t => t.DivisionId).IsRequired();
            builder.Entity<Team>().Property(t => t.CheerleaderImage);
            builder.Entity<Team>().Property(t => t.CoachImage);
            builder.Entity<Team>().Property(t => t.HeaderImage);
            builder.Entity<Team>().Property(t => t.LogoImage);
            builder.Entity<Team>().Property(t => t.Hex).IsRequired().HasDefaultValue("");
            builder.Entity<Team>().Property(t => t.R);
            builder.Entity<Team>().Property(t => t.G);
            builder.Entity<Team>().Property(t => t.B);

            //Fixture
            builder.Entity<Fixture>().ToTable("Fixtures");
            builder.Entity<Fixture>().HasKey(f => f.FixtureId);
            builder.Entity<Fixture>().Property(f => f.TournamentId).IsRequired();
            builder.Entity<Fixture>().Property(f => f.WeekId).IsRequired();
            builder.Entity<Fixture>().Property(f => f.AwayTeamId).IsRequired();
            builder.Entity<Fixture>().Property(f => f.HomeTeamId).IsRequired();
            builder.Entity<Fixture>().Property(f => f.AwayTeamScore);
            builder.Entity<Fixture>().Property(f => f.HomeTeamScore);
            builder.Entity<Fixture>().Property(f => f.IsOvertime).IsRequired().HasDefaultValueSql("0");

            //QBRating
            builder.Entity<QBRating>().ToTable("QBRatings");
            builder.Entity<QBRating>().HasKey(q => q.QBRatingId);
            builder.Entity<QBRating>().Property(q => q.TournamentId).IsRequired();
            builder.Entity<QBRating>().Property(q => q.TeamId).IsRequired();
            builder.Entity<QBRating>().Property(q => q.Completion).IsRequired();
            builder.Entity<QBRating>().Property(q => q.Gain).IsRequired();
            builder.Entity<QBRating>().Property(q => q.Touchdown).IsRequired();
            builder.Entity<QBRating>().Property(q => q.Interception).IsRequired();

            //Yardage
            builder.Entity<Yardage>().ToTable("Yardages");
            builder.Entity<Yardage>().HasKey(y => y.YardageId);
            builder.Entity<Yardage>().Property(y => y.TournamentId).IsRequired();
            builder.Entity<Yardage>().Property(y => y.TeamId).IsRequired();
            builder.Entity<Yardage>().Property(y => y.OffensePassingYards).IsRequired();
            builder.Entity<Yardage>().Property(y => y.OffenseRushingYards).IsRequired();
            builder.Entity<Yardage>().Property(y => y.OffenseTotalYards).IsRequired();
            builder.Entity<Yardage>().Property(y => y.DefensePassingYards).IsRequired();
            builder.Entity<Yardage>().Property(y => y.DefenseRushingYards).IsRequired();
            builder.Entity<Yardage>().Property(y => y.DefenseTotalYards).IsRequired();

            //RegularSeasonWins
            builder.Entity<RegularSeasonWins>().ToTable("RegularSeasonWins");
            builder.Entity<RegularSeasonWins>().HasKey(r => r.RegularSeasonWinsId);
            builder.Entity<RegularSeasonWins>().Property(r => r.TeamId).IsRequired();
            builder.Entity<RegularSeasonWins>().Property(r => r.TournamentId).IsRequired();
            builder.Entity<RegularSeasonWins>().Property(r => r.Wins).IsRequired();

            //PowerRanking
            builder.Entity<PowerRanking>().ToTable("PowerRankings");
            builder.Entity<PowerRanking>().HasKey(p => p.PowerRankingId);
            builder.Entity<PowerRanking>().Property(p => p.TournamentId).IsRequired();
            builder.Entity<PowerRanking>().Property(p => p.WeekId).IsRequired();
            builder.Entity<PowerRanking>().Property(p => p.TeamId).IsRequired();
            builder.Entity<PowerRanking>().Property(p => p.CurrentRanking).IsRequired();
            builder.Entity<PowerRanking>().Property(p => p.PreviousRanking).IsRequired();

            //TurnoverDifferential
            builder.Entity<TurnoverDifferential>().ToTable("TurnoverDifferentials");
            builder.Entity<TurnoverDifferential>().HasKey(t => t.TurnoverDifferentialId);
            builder.Entity<TurnoverDifferential>().Property(t => t.TournamentId).IsRequired();
            builder.Entity<TurnoverDifferential>().Property(t => t.TeamId).IsRequired();
            builder.Entity<TurnoverDifferential>().Property(t => t.FumbleTakeaways).IsRequired();
            builder.Entity<TurnoverDifferential>().Property(t => t.InterceptionTakeaways).IsRequired();
            builder.Entity<TurnoverDifferential>().Property(t => t.FumbleGiveaways).IsRequired();
            builder.Entity<TurnoverDifferential>().Property(t => t.InterceptionGiveaways).IsRequired();

            //SuperbowlOdds
            builder.Entity<SuperbowlOdds>().ToTable("SuperbowlOdds");
            builder.Entity<SuperbowlOdds>().HasKey(s => s.SuperbowlOddsId);
            builder.Entity<SuperbowlOdds>().Property(s => s.TeamId).IsRequired();
            builder.Entity<SuperbowlOdds>().Property(s => s.TournamentId).IsRequired();
            builder.Entity<SuperbowlOdds>().Property(s => s.Odds).IsRequired();

            //RecordCategory
            builder.Entity<RecordCategory>().ToTable("RecordCategories");
            builder.Entity<RecordCategory>().HasKey(r => r.RecordCategoryId);
            builder.Entity<RecordCategory>().Property(r => r.RecordCategoryName).IsRequired().HasMaxLength(100);
            builder.Entity<RecordCategory>().Property(r => r.IsPerSeason).IsRequired().HasDefaultValueSql("1");

            //Record
            builder.Entity<Record>().ToTable("Records");
            builder.Entity<Record>().HasKey(r => r.RecordId);
            builder.Entity<Record>().Property(r => r.RecordCategoryId).IsRequired();
            builder.Entity<Record>().Property(r => r.RecordAmount).IsRequired();
            builder.Entity<Record>().Property(r => r.SeasonId).IsRequired();
            builder.Entity<Record>().Property(r => r.TeamId).IsRequired();
            builder.Entity<Record>().Property(r => r.CoachId).IsRequired();
            builder.Entity<Record>().Property(r => r.Rank).IsRequired();
            builder.Entity<Record>().Property(r => r.RecordImage).IsRequired();
            builder.Entity<Record>().Property(r => r.Comments);

            //Score
            builder.Entity<Score>().ToTable("Scores");
            builder.Entity<Score>().HasKey(s => s.ScoreId);
            builder.Entity<Score>().Property(s => s.WeekId).IsRequired();
            builder.Entity<Score>().Property(s => s.ScoreDescription).IsRequired().HasMaxLength(75);

            //Formation
            builder.Entity<Formation>().ToTable("Formations");
            builder.Entity<Formation>().HasKey(f => f.FormationId);
            builder.Entity<Formation>().Property(f => f.FormationName).IsRequired().HasMaxLength(1).IsFixedLength();

            //OffensivePlay
            builder.Entity<OffensivePlay>().ToTable("OffensivePlays");
            builder.Entity<OffensivePlay>().HasKey(o => o.OffensivePlayId);
            builder.Entity<OffensivePlay>().Property(o => o.OffensivePlayName).IsRequired().HasMaxLength(2).IsFixedLength();

            //DefensivePlay
            builder.Entity<DefensivePlay>().ToTable("DefensivePlays");
            builder.Entity<DefensivePlay>().HasKey(d => d.DefensivePlayId);
            builder.Entity<DefensivePlay>().Property(d => d.DefensivePlayName).IsRequired().HasMaxLength(2).IsFixedLength();

            //PlayResult
            builder.Entity<PlayResult>().ToTable("PlayResults");
            builder.Entity<PlayResult>().HasKey(p => p.PlayResultId);
            builder.Entity<PlayResult>().Property(p => p.FormationId).IsRequired();
            builder.Entity<PlayResult>().Property(p => p.OffensivePlayId).IsRequired();
            builder.Entity<PlayResult>().Property(p => p.DefensivePlayId).IsRequired();
            builder.Entity<PlayResult>().Property(p => p.Yards).IsRequired();
            builder.Entity<PlayResult>().Property(p => p.IsOffensivePenalty).IsRequired().HasDefaultValueSql("0");
            builder.Entity<PlayResult>().Property(p => p.IsDefensivePenalty).IsRequired().HasDefaultValueSql("0");
            builder.Entity<PlayResult>().Property(p => p.IsSack).IsRequired().HasDefaultValueSql("0");
            builder.Entity<PlayResult>().Property(p => p.IsFumble).IsRequired().HasDefaultValueSql("0");
            builder.Entity<PlayResult>().Property(p => p.IsInterception).IsRequired().HasDefaultValueSql("0");
            builder.Entity<PlayResult>().Property(p => p.ReturnYards).IsRequired();

            //UserProfile
            builder.Entity<UserProfile>().ToTable("AspNetUserProfiles");
            builder.Entity<UserProfile>().HasKey(u => u.UserId);
            builder.Entity<UserProfile>().HasOne(u => u.User).WithOne(u => u.UserProfile)
                                        .OnDelete(DeleteBehavior.Cascade);
            builder.Entity<UserProfile>().Property(u => u.Timestamp).ValueGeneratedOnAddOrUpdate()
                                        .IsConcurrencyToken();
            builder.Entity<UserProfile>().Property(u => u.FirstName).HasMaxLength(60);
            builder.Entity<UserProfile>().Property(u => u.Surname).HasMaxLength(100);
            builder.Entity<UserProfile>().Property(u => u.RegistrationDate);

            //RefreshToken
            builder.Entity<RefreshToken>().ToTable("RefreshTokens");
            builder.Entity<RefreshToken>().HasKey(r => r.RefreshTokenId);
            builder.Entity<RefreshToken>().Property(r => r.UserId).IsRequired();

            builder.Entity<RefreshToken>().Property(r => r.StartDate).IsRequired();
            builder.Entity<RefreshToken>().Property(r => r.EndDate).IsRequired();
            builder.Entity<RefreshToken>().Property(r => r.IsEnabled).IsRequired();
        }
    }
}
