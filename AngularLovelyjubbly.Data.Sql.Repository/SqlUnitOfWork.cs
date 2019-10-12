using System;
using System.Threading.Tasks;
using AngularLovelyjubbly.Data.Sql.Contracts;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class SqlUnitOfWork : ISqlUnitOfWork, IDisposable
    {
        private ApplicationDbContext DbContext { get; set; }
        private CountryRepository _country = null;
        private LanguageRepository _language = null;
        private GenderRepository _gender = null;
        private DivisionRepository _division = null;
        private SeasonRepository _season = null;
        private CoachRepository _coach = null;
        private TournamentRepository _tournament = null;
        private WeekRepository _week = null;
        private TeamRepository _team = null;
        private FixtureRepository _fixture = null;
        private PowerRankingRepository _powerRanking = null;
        private QBRatingRepository _qbRating = null;
        private YardageRepository _yardage = null;
        private RegularSeasonWinsRepository _regularSeasonWins = null;
        private TurnoverDifferentialRepository _turnoverDifferential = null;
        private SuperbowlOddsRepository _superbowlOdds = null;
        private RecordCategoryRepository _recordCategory = null;
        private RecordRepository _record = null;
        private ScoreRepository _score = null;
        private FormationRepository _formation = null;
        private OffensivePlayRepository _offensivePlay = null;
        private DefensivePlayRepository _defensivePlay = null;
        private PlayResultRepository _playResult = null;
        private UserProfileRepository _userProfile = null;
        private RefreshTokenRepository _refreshToken = null;

        public SqlUnitOfWork(ApplicationDbContext dbContext)
        {
            DbContext = dbContext;

            _country = new CountryRepository(DbContext);
            _language = new LanguageRepository(DbContext);
            _gender = new GenderRepository(DbContext);
            _division = new DivisionRepository(DbContext);
            _season = new SeasonRepository(DbContext);
            _coach = new CoachRepository(DbContext);
            _tournament = new TournamentRepository(DbContext);
            _week = new WeekRepository(DbContext);
            _team = new TeamRepository(DbContext);
            _fixture = new FixtureRepository(DbContext);
            _powerRanking = new PowerRankingRepository(DbContext);
            _qbRating = new QBRatingRepository(DbContext);
            _yardage = new YardageRepository(DbContext);
            _regularSeasonWins = new RegularSeasonWinsRepository(DbContext);
            _turnoverDifferential = new TurnoverDifferentialRepository(DbContext);
            _superbowlOdds = new SuperbowlOddsRepository(DbContext);
            _recordCategory = new RecordCategoryRepository(DbContext);
            _record = new RecordRepository(DbContext);
            _score = new ScoreRepository(DbContext);
            _formation = new FormationRepository(DbContext);
            _offensivePlay = new OffensivePlayRepository(DbContext);
            _defensivePlay = new DefensivePlayRepository(DbContext);
            _playResult = new PlayResultRepository(DbContext);
            _userProfile = new UserProfileRepository(DbContext);
            _refreshToken = new RefreshTokenRepository(DbContext);
        }

        public ICountryRepository Countries
        {
            get
            {
                if (this._country == null)
                {
                    _country = new CountryRepository(DbContext);
                }

                return this._country;
            }
        }

        public ILanguageRepository Languages
        {
            get
            {
                if (this._language == null)
                {
                    _language = new LanguageRepository(DbContext);
                }

                return this._language;
            }
        }

        public IGenderRepository Genders
        {
            get
            {
                if (this._gender == null)
                {
                    _gender = new GenderRepository(DbContext);
                }

                return this._gender;
            }
        }

        public IDivisionRepository Divisions
        {
            get
            {
                if (this._division == null)
                {
                    _division = new DivisionRepository(DbContext);
                }

                return this._division;
            }
        }

        public ISeasonRepository Seasons
        {
            get
            {
                if (this._season == null)
                {
                    _season = new SeasonRepository(DbContext);
                }

                return this._season;
            }
        }

        public ICoachRepository Coaches
        {
            get
            {
                if (this._coach == null)
                {
                    _coach = new CoachRepository(DbContext);
                }

                return this._coach;
            }
        }

        public ITournamentRepository Tournaments
        {
            get
            {
                if (this._tournament == null)
                {
                    _tournament = new TournamentRepository(DbContext);
                }

                return this._tournament;
            }
        }

        public IWeekRepository Weeks
        {
            get
            {
                if (this._week == null)
                {
                    _week = new WeekRepository(DbContext);
                }

                return this._week;
            }
        }

        public ITeamRepository Teams
        {
            get
            {
                if (this._team == null)
                {
                    _team = new TeamRepository(DbContext);
                }

                return this._team;
            }
        }

        public IFixtureRepository Fixtures
        {
            get
            {
                if (this._fixture == null)
                {
                    _fixture = new FixtureRepository(DbContext);
                }

                return this._fixture;
            }
        }

        public IPowerRankingRepository PowerRankings
        {
            get
            {
                if (this._powerRanking == null)
                {
                    _powerRanking = new PowerRankingRepository(DbContext);
                }

                return this._powerRanking;
            }
        }

        public IQBRatingRepository QBRatings
        {
            get
            {
                if (this._qbRating == null)
                {
                    _qbRating = new QBRatingRepository(DbContext);
                }

                return this._qbRating;
            }
        }

        public IYardageRepository Yardages
        {
            get
            {
                if (this._yardage == null)
                {
                    _yardage = new YardageRepository(DbContext);
                }

                return this._yardage;
            }
        }

        public IRegularSeasonWinsRepository RegularSeasonWins
        {
            get
            {
                if (this._regularSeasonWins == null)
                {
                    _regularSeasonWins = new RegularSeasonWinsRepository(DbContext);
                }

                return this._regularSeasonWins;
            }
        }

        public ITurnoverDifferentialRepository TurnoverDifferentials
        {
            get
            {
                if (this._turnoverDifferential == null)
                {
                    _turnoverDifferential = new TurnoverDifferentialRepository(DbContext);
                }

                return this._turnoverDifferential;
            }
        }

        public ISuperbowlOddsRepository SuperbowlOdds
        {
            get
            {
                if (this._superbowlOdds == null)
                {
                    _superbowlOdds = new SuperbowlOddsRepository(DbContext);
                }

                return this._superbowlOdds;
            }
        }

        public IRecordCategoryRepository RecordCategories
        {
            get
            {
                if (this._recordCategory == null)
                {
                    _recordCategory = new RecordCategoryRepository(DbContext);
                }

                return this._recordCategory;
            }
        }

        public IRecordRepository Records
        {
            get
            {
                if (this._record == null)
                {
                    _record = new RecordRepository(DbContext);
                }

                return this._record;
            }
        }

        public IScoreRepository Scores
        {
            get
            {
                if (this._score == null)
                {
                    _score = new ScoreRepository(DbContext);
                }

                return this._score;
            }
        }

        public IFormationRepository Formations
        {
            get
            {
                if (this._formation == null)
                {
                    _formation = new FormationRepository(DbContext);
                }

                return this._formation;
            }
        }

        public IOffensivePlayRepository OffensivePlays
        {
            get
            {
                if (this._offensivePlay == null)
                {
                    _offensivePlay = new OffensivePlayRepository(DbContext);
                }

                return this._offensivePlay;
            }
        }

        public IDefensivePlayRepository DefensivePlays
        {
            get
            {
                if (this._defensivePlay == null)
                {
                    _defensivePlay = new DefensivePlayRepository(DbContext);
                }

                return this._defensivePlay;
            }
        }

        public IPlayResultRepository PlayResults
        {
            get
            {
                if (this._playResult == null)
                {
                    _playResult = new PlayResultRepository(DbContext);
                }

                return this._playResult;
            }
        }

        public IUserProfileRepository UserProfiles
        {
            get
            {
                if (this._userProfile == null)
                {
                    _userProfile = new UserProfileRepository(DbContext);
                }

                return this._userProfile;
            }
        }

        public IRefreshTokenRepository RefreshTokens
        {
            get
            {
                if (this._refreshToken == null)
                {
                    _refreshToken = new RefreshTokenRepository(DbContext);
                }

                return this._refreshToken;
            }
        }

        public async Task SaveChangesAsync()
        {
            await this.DbContext.SaveChangesAsync();
        }


        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                //null propagation
                DbContext?.Dispose();
            }
        }
    }
}
