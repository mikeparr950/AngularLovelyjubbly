using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularLovelyjubbly.Migrations
{
    public partial class AddFormationOffensivePlayDefensivePlayTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DefensivePlays",
                columns: table => new
                {
                    DefensivePlayId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DefensivePlayName = table.Column<string>(fixedLength: true, maxLength: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefensivePlays", x => x.DefensivePlayId);
                });

            migrationBuilder.CreateTable(
                name: "Formations",
                columns: table => new
                {
                    FormationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FormationName = table.Column<string>(fixedLength: true, maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Formations", x => x.FormationId);
                });

            migrationBuilder.CreateTable(
                name: "OffensivePlays",
                columns: table => new
                {
                    OffensivePlayId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OffensivePlayName = table.Column<string>(fixedLength: true, maxLength: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OffensivePlays", x => x.OffensivePlayId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DefensivePlays");

            migrationBuilder.DropTable(
                name: "Formations");

            migrationBuilder.DropTable(
                name: "OffensivePlays");
        }
    }
}
