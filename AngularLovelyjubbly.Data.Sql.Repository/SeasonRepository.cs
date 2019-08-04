using System.Collections.Generic;
using System.Linq;
using AngularLovelyjubbly.Data.Sql.Contracts;
using AngularLovelyjubbly.Data.Sql.Models;

namespace AngularLovelyjubbly.Data.Sql.Repository
{
    public class SeasonRepository : GenericRepository<Season>, ISeasonRepository
    {
        public SeasonRepository(ApplicationDbContext context) : base(context)
        {

        }

        public override IQueryable<Season> GetAll()
        {
            Season season2026 = new Season
            {
                SeasonId = 2026,
                SeasonName = "2026"
            };

            Season season2025 = new Season
            {
                SeasonId = 2025,
                SeasonName = "2025"
            };

            Season season2024 = new Season
            {
                SeasonId = 2024,
                SeasonName = "2024"
            };

            Season season2023 = new Season
            {
                SeasonId = 2023,
                SeasonName = "2023"
            };

            Season season2022 = new Season
            {
                SeasonId = 2022,
                SeasonName = "2022"
            };

            Season season2021 = new Season
            {
                SeasonId = 2021,
                SeasonName = "2021"
            };

            Season season2020 = new Season
            {
                SeasonId = 2020,
                SeasonName = "2020"
            };

            Season season2019 = new Season
            {
                SeasonId = 2019,
                SeasonName = "2019"
            };

            Season season2018 = new Season
            {
                SeasonId = 2018,
                SeasonName = "2018"
            };

            Season season2017 = new Season
            {
                SeasonId = 2017,
                SeasonName = "2017"
            };

            Season season2016 = new Season
            {
                SeasonId = 2016,
                SeasonName = "2016"
            };

            Season season2015 = new Season
            {
                SeasonId = 2015,
                SeasonName = "2015"
            };

            Season season2014 = new Season
            {
                SeasonId = 2014,
                SeasonName = "2014"
            };

            Season season2013 = new Season
            {
                SeasonId = 2013,
                SeasonName = "2013"
            };

            Season season2012 = new Season
            {
                SeasonId = 2012,
                SeasonName = "2012"
            };

            Season season2011 = new Season
            {
                SeasonId = 2011,
                SeasonName = "2011"
            };

            Season season2010 = new Season
            {
                SeasonId = 2010,
                SeasonName = "2010"
            };

            Season season2009 = new Season
            {
                SeasonId = 2009,
                SeasonName = "2009"
            };

            Season season1994 = new Season
            {
                SeasonId = 1994,
                SeasonName = "1994"
            };

            Season season1993 = new Season
            {
                SeasonId = 1993,
                SeasonName = "1993"
            };

            Season season1992 = new Season
            {
                SeasonId = 1992,
                SeasonName = "1992"
            };

            List<Season> lstSeasons = new List<Season>
            {
                season2026,
                season2025,
                season2024,
                season2023,
                season2022,
                season2021,
                season2020,
                season2019,
                season2018,
                season2017,
                season2016,
                season2015,
                season2014,
                season2013,
                season2012,
                season2011,
                season2010,
                season2009,
                season1994,
                season1993,
                season1992
            };

            return lstSeasons.AsQueryable();
        }
    }
}
