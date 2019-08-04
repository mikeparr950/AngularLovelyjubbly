using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularLovelyjubbly.Migrations
{
    public partial class InitialMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "AspNetRoles",
            //    columns: table => new
            //    {
            //        Id = table.Column<string>(nullable: false),
            //        Name = table.Column<string>(maxLength: 256, nullable: true),
            //        NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
            //        ConcurrencyStamp = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetRoles", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUsers",
            //    columns: table => new
            //    {
            //        Id = table.Column<string>(nullable: false),
            //        UserName = table.Column<string>(maxLength: 256, nullable: true),
            //        NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
            //        Email = table.Column<string>(maxLength: 256, nullable: true),
            //        NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
            //        EmailConfirmed = table.Column<bool>(nullable: false),
            //        PasswordHash = table.Column<string>(nullable: true),
            //        SecurityStamp = table.Column<string>(nullable: true),
            //        ConcurrencyStamp = table.Column<string>(nullable: true),
            //        PhoneNumber = table.Column<string>(nullable: true),
            //        PhoneNumberConfirmed = table.Column<bool>(nullable: false),
            //        TwoFactorEnabled = table.Column<bool>(nullable: false),
            //        LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
            //        LockoutEnabled = table.Column<bool>(nullable: false),
            //        AccessFailedCount = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUsers", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Coaches",
            //    columns: table => new
            //    {
            //        CoachId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        CoachName = table.Column<string>(maxLength: 50, nullable: false),
            //        CoachNameShort = table.Column<string>(maxLength: 20, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Coaches", x => x.CoachId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Countries",
            //    columns: table => new
            //    {
            //        CountryId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        CountryNameEn = table.Column<string>(maxLength: 50, nullable: false),
            //        CountryNameFi = table.Column<string>(maxLength: 50, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Countries", x => x.CountryId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Divisions",
            //    columns: table => new
            //    {
            //        DivisionId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        DivisionName = table.Column<string>(maxLength: 15, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Divisions", x => x.DivisionId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Genders",
            //    columns: table => new
            //    {
            //        GenderId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        GenderDescription = table.Column<string>(maxLength: 10, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Genders", x => x.GenderId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Languages",
            //    columns: table => new
            //    {
            //        LanguageId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        LanguageName = table.Column<string>(maxLength: 50, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Languages", x => x.LanguageId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "RecordCategories",
            //    columns: table => new
            //    {
            //        RecordCategoryId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        RecordCategoryName = table.Column<string>(maxLength: 100, nullable: false),
            //        IsPerSeason = table.Column<bool>(nullable: false, defaultValueSql: "1")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_RecordCategories", x => x.RecordCategoryId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Seasons",
            //    columns: table => new
            //    {
            //        SeasonId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        SeasonName = table.Column<string>(maxLength: 4, nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Seasons", x => x.SeasonId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Weeks",
            //    columns: table => new
            //    {
            //        WeekId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        WeekNumber = table.Column<string>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Weeks", x => x.WeekId);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetRoleClaims",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        RoleId = table.Column<string>(nullable: false),
            //        ClaimType = table.Column<string>(nullable: true),
            //        ClaimValue = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
            //            column: x => x.RoleId,
            //            principalTable: "AspNetRoles",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUserClaims",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        UserId = table.Column<string>(nullable: false),
            //        ClaimType = table.Column<string>(nullable: true),
            //        ClaimValue = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_AspNetUserClaims_AspNetUsers_UserId",
            //            column: x => x.UserId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUserLogins",
            //    columns: table => new
            //    {
            //        LoginProvider = table.Column<string>(nullable: false),
            //        ProviderKey = table.Column<string>(nullable: false),
            //        ProviderDisplayName = table.Column<string>(nullable: true),
            //        UserId = table.Column<string>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
            //        table.ForeignKey(
            //            name: "FK_AspNetUserLogins_AspNetUsers_UserId",
            //            column: x => x.UserId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUserRoles",
            //    columns: table => new
            //    {
            //        UserId = table.Column<string>(nullable: false),
            //        RoleId = table.Column<string>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
            //        table.ForeignKey(
            //            name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
            //            column: x => x.RoleId,
            //            principalTable: "AspNetRoles",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_AspNetUserRoles_AspNetUsers_UserId",
            //            column: x => x.UserId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUserTokens",
            //    columns: table => new
            //    {
            //        UserId = table.Column<string>(nullable: false),
            //        LoginProvider = table.Column<string>(nullable: false),
            //        Name = table.Column<string>(nullable: false),
            //        Value = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
            //        table.ForeignKey(
            //            name: "FK_AspNetUserTokens_AspNetUsers_UserId",
            //            column: x => x.UserId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "RefreshTokens",
            //    columns: table => new
            //    {
            //        RefreshTokenId = table.Column<Guid>(nullable: false),
            //        UserId = table.Column<string>(nullable: false),
            //        StartDate = table.Column<DateTime>(nullable: false),
            //        EndDate = table.Column<DateTime>(nullable: false),
            //        IsEnabled = table.Column<bool>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_RefreshTokens", x => x.RefreshTokenId);
            //        table.ForeignKey(
            //            name: "FK_RefreshTokens_AspNetUsers_UserId",
            //            column: x => x.UserId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Teams",
            //    columns: table => new
            //    {
            //        TeamId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        TeamName = table.Column<string>(maxLength: 75, nullable: false),
            //        TeamNameShort = table.Column<string>(maxLength: 15, nullable: false),
            //        LogoImage = table.Column<string>(nullable: true),
            //        HeaderImage = table.Column<string>(nullable: true),
            //        CoachImage = table.Column<string>(nullable: true),
            //        CheerleaderImage = table.Column<string>(nullable: true),
            //        DivisionId = table.Column<int>(nullable: false),
            //        CoachId = table.Column<int>(nullable: false),
            //        Hex = table.Column<string>(nullable: false, defaultValue: ""),
            //        R = table.Column<int>(nullable: false),
            //        G = table.Column<int>(nullable: false),
            //        B = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Teams", x => x.TeamId);
            //        table.ForeignKey(
            //            name: "FK_Teams_Coaches_CoachId",
            //            column: x => x.CoachId,
            //            principalTable: "Coaches",
            //            principalColumn: "CoachId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Teams_Divisions_DivisionId",
            //            column: x => x.DivisionId,
            //            principalTable: "Divisions",
            //            principalColumn: "DivisionId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "AspNetUserProfiles",
            //    columns: table => new
            //    {
            //        UserId = table.Column<string>(nullable: false),
            //        FirstName = table.Column<string>(maxLength: 60, nullable: true),
            //        Surname = table.Column<string>(maxLength: 100, nullable: true),
            //        RegistrationDate = table.Column<DateTime>(nullable: false),
            //        CountryId = table.Column<int>(nullable: true),
            //        LanguageId = table.Column<int>(nullable: true),
            //        BirthDate = table.Column<DateTime>(nullable: true),
            //        GenderId = table.Column<int>(nullable: true),
            //        Timestamp = table.Column<byte[]>(rowVersion: true, nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AspNetUserProfiles", x => x.UserId);
            //        table.ForeignKey(
            //            name: "FK_AspNetUserProfiles_Countries_CountryId",
            //            column: x => x.CountryId,
            //            principalTable: "Countries",
            //            principalColumn: "CountryId",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_AspNetUserProfiles_Genders_GenderId",
            //            column: x => x.GenderId,
            //            principalTable: "Genders",
            //            principalColumn: "GenderId",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_AspNetUserProfiles_Languages_LanguageId",
            //            column: x => x.LanguageId,
            //            principalTable: "Languages",
            //            principalColumn: "LanguageId",
            //            onDelete: ReferentialAction.Restrict);
            //        table.ForeignKey(
            //            name: "FK_AspNetUserProfiles_AspNetUsers_UserId",
            //            column: x => x.UserId,
            //            principalTable: "AspNetUsers",
            //            principalColumn: "Id",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Tournaments",
            //    columns: table => new
            //    {
            //        TournamentId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        TournamentName = table.Column<string>(maxLength: 100, nullable: false),
            //        SeasonId = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Tournaments", x => x.TournamentId);
            //        table.ForeignKey(
            //            name: "FK_Tournaments_Seasons_SeasonId",
            //            column: x => x.SeasonId,
            //            principalTable: "Seasons",
            //            principalColumn: "SeasonId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Records",
            //    columns: table => new
            //    {
            //        RecordId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        RecordCategoryId = table.Column<int>(nullable: false),
            //        RecordAmount = table.Column<double>(nullable: false),
            //        SeasonId = table.Column<int>(nullable: false),
            //        TeamId = table.Column<int>(nullable: false),
            //        CoachId = table.Column<int>(nullable: false),
            //        Rank = table.Column<byte>(nullable: false),
            //        RecordImage = table.Column<string>(nullable: false),
            //        Comments = table.Column<string>(nullable: true),
            //        WeekId = table.Column<int>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Records", x => x.RecordId);
            //        table.ForeignKey(
            //            name: "FK_Records_Coaches_CoachId",
            //            column: x => x.CoachId,
            //            principalTable: "Coaches",
            //            principalColumn: "CoachId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Records_RecordCategories_RecordCategoryId",
            //            column: x => x.RecordCategoryId,
            //            principalTable: "RecordCategories",
            //            principalColumn: "RecordCategoryId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Records_Seasons_SeasonId",
            //            column: x => x.SeasonId,
            //            principalTable: "Seasons",
            //            principalColumn: "SeasonId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Records_Teams_TeamId",
            //            column: x => x.TeamId,
            //            principalTable: "Teams",
            //            principalColumn: "TeamId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Records_Weeks_WeekId",
            //            column: x => x.WeekId,
            //            principalTable: "Weeks",
            //            principalColumn: "WeekId",
            //            onDelete: ReferentialAction.Restrict);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Fixtures",
            //    columns: table => new
            //    {
            //        FixtureId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        TournamentId = table.Column<int>(nullable: false),
            //        WeekId = table.Column<int>(nullable: false),
            //        AwayTeamId = table.Column<int>(nullable: false),
            //        HomeTeamId = table.Column<int>(nullable: false),
            //        AwayTeamScore = table.Column<byte>(nullable: true),
            //        HomeTeamScore = table.Column<byte>(nullable: true),
            //        IsOvertime = table.Column<bool>(nullable: false, defaultValueSql: "0")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Fixtures", x => x.FixtureId);
            //        table.ForeignKey(
            //            name: "FK_Fixtures_Teams_AwayTeamId",
            //            column: x => x.AwayTeamId,
            //            principalTable: "Teams",
            //            principalColumn: "TeamId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Fixtures_Teams_HomeTeamId",
            //            column: x => x.HomeTeamId,
            //            principalTable: "Teams",
            //            principalColumn: "TeamId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Fixtures_Tournaments_TournamentId",
            //            column: x => x.TournamentId,
            //            principalTable: "Tournaments",
            //            principalColumn: "TournamentId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Fixtures_Weeks_WeekId",
            //            column: x => x.WeekId,
            //            principalTable: "Weeks",
            //            principalColumn: "WeekId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "PowerRankings",
            //    columns: table => new
            //    {
            //        PowerRankingId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        TournamentId = table.Column<int>(nullable: false),
            //        WeekId = table.Column<int>(nullable: false),
            //        TeamId = table.Column<int>(nullable: false),
            //        CurrentRanking = table.Column<byte>(nullable: false),
            //        PreviousRanking = table.Column<byte>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_PowerRankings", x => x.PowerRankingId);
            //        table.ForeignKey(
            //            name: "FK_PowerRankings_Teams_TeamId",
            //            column: x => x.TeamId,
            //            principalTable: "Teams",
            //            principalColumn: "TeamId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_PowerRankings_Tournaments_TournamentId",
            //            column: x => x.TournamentId,
            //            principalTable: "Tournaments",
            //            principalColumn: "TournamentId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_PowerRankings_Weeks_WeekId",
            //            column: x => x.WeekId,
            //            principalTable: "Weeks",
            //            principalColumn: "WeekId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "QBRatings",
            //    columns: table => new
            //    {
            //        QBRatingId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        TournamentId = table.Column<int>(nullable: false),
            //        TeamId = table.Column<int>(nullable: false),
            //        Completion = table.Column<double>(nullable: false),
            //        Gain = table.Column<double>(nullable: false),
            //        Touchdown = table.Column<double>(nullable: false),
            //        Interception = table.Column<double>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_QBRatings", x => x.QBRatingId);
            //        table.ForeignKey(
            //            name: "FK_QBRatings_Teams_TeamId",
            //            column: x => x.TeamId,
            //            principalTable: "Teams",
            //            principalColumn: "TeamId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_QBRatings_Tournaments_TournamentId",
            //            column: x => x.TournamentId,
            //            principalTable: "Tournaments",
            //            principalColumn: "TournamentId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "RegularSeasonWins",
            //    columns: table => new
            //    {
            //        RegularSeasonWinsId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        TeamId = table.Column<int>(nullable: false),
            //        TournamentId = table.Column<int>(nullable: false),
            //        Wins = table.Column<decimal>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_RegularSeasonWins", x => x.RegularSeasonWinsId);
            //        table.ForeignKey(
            //            name: "FK_RegularSeasonWins_Teams_TeamId",
            //            column: x => x.TeamId,
            //            principalTable: "Teams",
            //            principalColumn: "TeamId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_RegularSeasonWins_Tournaments_TournamentId",
            //            column: x => x.TournamentId,
            //            principalTable: "Tournaments",
            //            principalColumn: "TournamentId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "SuperbowlOdds",
            //    columns: table => new
            //    {
            //        SuperbowlOddsId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        TournamentId = table.Column<int>(nullable: false),
            //        TeamId = table.Column<int>(nullable: false),
            //        Odds = table.Column<byte>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_SuperbowlOdds", x => x.SuperbowlOddsId);
            //        table.ForeignKey(
            //            name: "FK_SuperbowlOdds_Teams_TeamId",
            //            column: x => x.TeamId,
            //            principalTable: "Teams",
            //            principalColumn: "TeamId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_SuperbowlOdds_Tournaments_TournamentId",
            //            column: x => x.TournamentId,
            //            principalTable: "Tournaments",
            //            principalColumn: "TournamentId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "TurnoverDifferentials",
            //    columns: table => new
            //    {
            //        TurnoverDifferentialId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        TeamId = table.Column<int>(nullable: false),
            //        TournamentId = table.Column<int>(nullable: false),
            //        FumbleTakeaways = table.Column<int>(nullable: false),
            //        InterceptionTakeaways = table.Column<int>(nullable: false),
            //        FumbleGiveaways = table.Column<int>(nullable: false),
            //        InterceptionGiveaways = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_TurnoverDifferentials", x => x.TurnoverDifferentialId);
            //        table.ForeignKey(
            //            name: "FK_TurnoverDifferentials_Teams_TeamId",
            //            column: x => x.TeamId,
            //            principalTable: "Teams",
            //            principalColumn: "TeamId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_TurnoverDifferentials_Tournaments_TournamentId",
            //            column: x => x.TournamentId,
            //            principalTable: "Tournaments",
            //            principalColumn: "TournamentId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Yardages",
            //    columns: table => new
            //    {
            //        YardageId = table.Column<int>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        TournamentId = table.Column<int>(nullable: false),
            //        TeamId = table.Column<int>(nullable: false),
            //        OffensePassingYards = table.Column<int>(nullable: false),
            //        OffenseRushingYards = table.Column<int>(nullable: false),
            //        OffenseTotalYards = table.Column<int>(nullable: false),
            //        DefensePassingYards = table.Column<int>(nullable: false),
            //        DefenseRushingYards = table.Column<int>(nullable: false),
            //        DefenseTotalYards = table.Column<int>(nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Yardages", x => x.YardageId);
            //        table.ForeignKey(
            //            name: "FK_Yardages_Teams_TeamId",
            //            column: x => x.TeamId,
            //            principalTable: "Teams",
            //            principalColumn: "TeamId",
            //            onDelete: ReferentialAction.Cascade);
            //        table.ForeignKey(
            //            name: "FK_Yardages_Tournaments_TournamentId",
            //            column: x => x.TournamentId,
            //            principalTable: "Tournaments",
            //            principalColumn: "TournamentId",
            //            onDelete: ReferentialAction.Cascade);
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetRoleClaims_RoleId",
            //    table: "AspNetRoleClaims",
            //    column: "RoleId");

            //migrationBuilder.CreateIndex(
            //    name: "RoleNameIndex",
            //    table: "AspNetRoles",
            //    column: "NormalizedName",
            //    unique: true,
            //    filter: "[NormalizedName] IS NOT NULL");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetUserClaims_UserId",
            //    table: "AspNetUserClaims",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetUserLogins_UserId",
            //    table: "AspNetUserLogins",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetUserProfiles_CountryId",
            //    table: "AspNetUserProfiles",
            //    column: "CountryId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetUserProfiles_GenderId",
            //    table: "AspNetUserProfiles",
            //    column: "GenderId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetUserProfiles_LanguageId",
            //    table: "AspNetUserProfiles",
            //    column: "LanguageId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AspNetUserRoles_RoleId",
            //    table: "AspNetUserRoles",
            //    column: "RoleId");

            //migrationBuilder.CreateIndex(
            //    name: "EmailIndex",
            //    table: "AspNetUsers",
            //    column: "NormalizedEmail");

            //migrationBuilder.CreateIndex(
            //    name: "UserNameIndex",
            //    table: "AspNetUsers",
            //    column: "NormalizedUserName",
            //    unique: true,
            //    filter: "[NormalizedUserName] IS NOT NULL");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Fixtures_AwayTeamId",
            //    table: "Fixtures",
            //    column: "AwayTeamId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Fixtures_HomeTeamId",
            //    table: "Fixtures",
            //    column: "HomeTeamId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Fixtures_TournamentId",
            //    table: "Fixtures",
            //    column: "TournamentId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Fixtures_WeekId",
            //    table: "Fixtures",
            //    column: "WeekId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PowerRankings_TeamId",
            //    table: "PowerRankings",
            //    column: "TeamId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PowerRankings_TournamentId",
            //    table: "PowerRankings",
            //    column: "TournamentId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PowerRankings_WeekId",
            //    table: "PowerRankings",
            //    column: "WeekId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_QBRatings_TeamId",
            //    table: "QBRatings",
            //    column: "TeamId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_QBRatings_TournamentId",
            //    table: "QBRatings",
            //    column: "TournamentId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Records_CoachId",
            //    table: "Records",
            //    column: "CoachId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Records_RecordCategoryId",
            //    table: "Records",
            //    column: "RecordCategoryId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Records_SeasonId",
            //    table: "Records",
            //    column: "SeasonId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Records_TeamId",
            //    table: "Records",
            //    column: "TeamId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Records_WeekId",
            //    table: "Records",
            //    column: "WeekId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_RefreshTokens_UserId",
            //    table: "RefreshTokens",
            //    column: "UserId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_RegularSeasonWins_TeamId",
            //    table: "RegularSeasonWins",
            //    column: "TeamId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_RegularSeasonWins_TournamentId",
            //    table: "RegularSeasonWins",
            //    column: "TournamentId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_SuperbowlOdds_TeamId",
            //    table: "SuperbowlOdds",
            //    column: "TeamId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_SuperbowlOdds_TournamentId",
            //    table: "SuperbowlOdds",
            //    column: "TournamentId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Teams_CoachId",
            //    table: "Teams",
            //    column: "CoachId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Teams_DivisionId",
            //    table: "Teams",
            //    column: "DivisionId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Tournaments_SeasonId",
            //    table: "Tournaments",
            //    column: "SeasonId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_TurnoverDifferentials_TeamId",
            //    table: "TurnoverDifferentials",
            //    column: "TeamId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_TurnoverDifferentials_TournamentId",
            //    table: "TurnoverDifferentials",
            //    column: "TournamentId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Yardages_TeamId",
            //    table: "Yardages",
            //    column: "TeamId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Yardages_TournamentId",
            //    table: "Yardages",
            //    column: "TournamentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserProfiles");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Fixtures");

            migrationBuilder.DropTable(
                name: "PowerRankings");

            migrationBuilder.DropTable(
                name: "QBRatings");

            migrationBuilder.DropTable(
                name: "Records");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "RegularSeasonWins");

            migrationBuilder.DropTable(
                name: "SuperbowlOdds");

            migrationBuilder.DropTable(
                name: "TurnoverDifferentials");

            migrationBuilder.DropTable(
                name: "Yardages");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "Genders");

            migrationBuilder.DropTable(
                name: "Languages");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "RecordCategories");

            migrationBuilder.DropTable(
                name: "Weeks");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "Tournaments");

            migrationBuilder.DropTable(
                name: "Coaches");

            migrationBuilder.DropTable(
                name: "Divisions");

            migrationBuilder.DropTable(
                name: "Seasons");
        }
    }
}
