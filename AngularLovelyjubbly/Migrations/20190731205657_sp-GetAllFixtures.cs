using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularLovelyjubbly.Migrations
{
    public partial class spGetAllFixtures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sp = @"USE [LovelyjubblyAngular_db]
                        GO

                        SET ANSI_NULLS ON
                        GO

                        SET QUOTED_IDENTIFIER ON
                        GO

                        CREATE PROCEDURE [dbo].[GetAllFixtures]
                                AS
                                BEGIN
                                    SET NOCOUNT ON;
                                    select f.fixtureid, f.awayteamid, t.TeamName as 'AwayTeamName', f.awayteamscore, f.hometeamid, t2.TeamName as 'HomeTeamName', f.HomeTeamScore, 
			                        f.IsOvertime, f.TournamentId, tu.TournamentName, tu.SeasonId, f.weekid, w.WeekNumber
			                        from [dbo].[Fixtures] f
			                        inner join [dbo].[Teams] t
			                        on f.AwayTeamId = t.TeamId
			                        inner join [dbo].[Teams] t2
			                        on f.HomeTeamId = t2.TeamId
			                        inner join [dbo].[Tournaments] tu
			                        on f.TournamentId = tu.TournamentId
			                        inner join [dbo].[Weeks] w
			                        on f.WeekId = w.WeekId
                                END
                        GO";

            migrationBuilder.Sql(sp);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
