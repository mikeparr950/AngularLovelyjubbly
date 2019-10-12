using System;
using System.Threading.Tasks;

namespace AngularLovelyjubbly.Data.Sql.Contracts
{
    public interface ISqlUnitOfWork : IDisposable
    {
        ICountryRepository Countries { get; }
        ILanguageRepository Languages { get; }
        IGenderRepository Genders { get; }
        IDivisionRepository Divisions { get; }
        ISeasonRepository Seasons { get; }
        ICoachRepository Coaches { get; }
        ITournamentRepository Tournaments { get; }
        IWeekRepository Weeks { get; }
        ITeamRepository Teams { get; }
        IFixtureRepository Fixtures { get; }
        IYardageRepository Yardages { get; }
        IPowerRankingRepository PowerRankings { get; }
        IQBRatingRepository QBRatings { get; }
        IRegularSeasonWinsRepository RegularSeasonWins { get; }
        ITurnoverDifferentialRepository TurnoverDifferentials { get; }
        ISuperbowlOddsRepository SuperbowlOdds { get; }
        IRecordCategoryRepository RecordCategories { get; }
        IRecordRepository Records { get; }
        IScoreRepository Scores { get; }
        IFormationRepository Formations { get; }
        IOffensivePlayRepository OffensivePlays { get; }
        IDefensivePlayRepository DefensivePlays { get; }
        IPlayResultRepository PlayResults { get; }
        IUserProfileRepository UserProfiles { get; }
        IRefreshTokenRepository RefreshTokens { get; }

        Task SaveChangesAsync();
    }
}
