using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularLovelyjubbly.Migrations
{
    public partial class AddPlayResultTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlayResults",
                columns: table => new
                {
                    PlayResultId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FormationId = table.Column<int>(nullable: false),
                    OffensivePlayId = table.Column<int>(nullable: false),
                    DefensivePlayId = table.Column<int>(nullable: false),
                    Yards = table.Column<int>(nullable: false),
                    IsOffensivePenalty = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    IsDefensivePenalty = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    IsSack = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    IsFumble = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    IsInterception = table.Column<bool>(nullable: false, defaultValueSql: "0"),
                    ReturnYards = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayResults", x => x.PlayResultId);
                    table.ForeignKey(
                        name: "FK_PlayResults_DefensivePlays_DefensivePlayId",
                        column: x => x.DefensivePlayId,
                        principalTable: "DefensivePlays",
                        principalColumn: "DefensivePlayId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayResults_Formations_FormationId",
                        column: x => x.FormationId,
                        principalTable: "Formations",
                        principalColumn: "FormationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayResults_OffensivePlays_OffensivePlayId",
                        column: x => x.OffensivePlayId,
                        principalTable: "OffensivePlays",
                        principalColumn: "OffensivePlayId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlayResults_DefensivePlayId",
                table: "PlayResults",
                column: "DefensivePlayId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayResults_FormationId",
                table: "PlayResults",
                column: "FormationId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayResults_OffensivePlayId",
                table: "PlayResults",
                column: "OffensivePlayId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlayResults");
        }
    }
}
