export const guns = [
    "Odin",
    "Ares",
    "Vandal",
    "Bulldog",
    "Phantom",
    "Judge",
    "Bucky",
    "Frenzy",
    "Classic",
    "Ghost",
    "Sheriff",
    "Shorty",
    "Operator",
    "Guardian",
    "Marshal",
    "Spectre",
    "Stinger",
    "Knife",
] as const;

export type Guns = typeof guns[number];

export type SkinsType<T> = T extends "Knife"
    ? KnifeSkins
    : T extends "Stinger"
    ? StingerSkins
    : T extends "Spectre"
    ? SpectreSkins
    : T extends "Marshal"
    ? MarshalSkins
    : T extends "Guardian"
    ? GuardianSkins
    : T extends "Operator"
    ? OperatorSkins
    : T extends "Shorty"
    ? ShortySkins
    : T extends "Sheriff"
    ? SheriffSkins
    : T extends "Ghost"
    ? GhostSkins
    : T extends "Classic"
    ? ClassicSkins
    : T extends "Frenzy"
    ? FrenzySkins
    : T extends "Bucky"
    ? BuckySkins
    : T extends "Judge"
    ? JudgeSkins
    : T extends "Phantom"
    ? PhantomSkins
    : T extends "Bulldog"
    ? BulldogSkins
    : T extends "Vandal"
    ? VandalSkins
    : T extends "Ares"
    ? AresSkins
    : T extends "Odin"
    ? OdinSkins
    : null;

export type VandalSkins =
    | "Aristocrat Vandal"
    | "Origin Vandal"
    | "Glitchpop Vandal"
    | "Elderflame Vandal"
    | "Nitro Vandal"
    | "Hivemind Vandal"
    | "Forsaken Vandal"
    | "Ruin Vandal"
    | "dot EXE Vandal"
    | "Horizon Vandal"
    | "Prime Vandal"
    | "Avalanche Vandal"
    | "Prism II Vandal"
    | "K/TAC Vandal"
    | "Luxe Vandal"
    | "Silvanus Vandal"
    | "Sensation Vandal"
    | "Sakura Vandal"
    | "Sentinels of Light Vandal"
    | "Reaver Vandal"
    | "Tethered Realms Vandal"
    | "Cavalier Vandal"
    | "Standard Vandal"
    | "Depths Vandal"
    | "Ego Vandal"
    | "Wasteland Vandal"
    | "Winterwunderland Vandal";

export type OdinSkins =
    | "Glitchpop Odin"
    | "Nitro Odin"
    | "dot EXE Odin"
    | "Prime//2.0 Odin"
    | "Prism III Odin"
    | "Smite Odin"
    | "Sensation Odin"
    | "Lightwave Odin"
    | "Standard Odin"
    | "Aerosol Odin"
    | "BlastX Odin";

export type AresSkins =
    | "Aristocrat Ares"
    | "Nebula Ares"
    | "Singularity Ares"
    | "Rush Ares"
    | "Hivemind Ares"
    | "Infantry Ares"
    | "Outpost Ares"
    | "Prism Ares"
    | "Celestial Ares"
    | "Minima Ares"
    | "POLYfrog Ares"
    | "Jigsaw Ares"
    | "Sakura Ares"
    | "Sentinels of Light Ares"
    | "Standard Ares";

export type BulldogSkins =
    | "Aristocrat Bulldog"
    | "Spectrum Bulldog"
    | "Glitchpop Bulldog"
    | "Rush Bulldog"
    | "Horizon Bulldog"
    | "K/TAC Bulldog"
    | "Couture Bulldog"
    | "POLYfox Bulldog"
    | "Infinity Bulldog"
    | "Standard Bulldog"
    | "Convex Bulldog"
    | "Depths Bulldog"
    | "Varnish Bulldog";

export type PhantomSkins =
    | "VALORANT GO! Vol. 1 Phantom"
    | "Spectrum Phantom"
    | "Nebula Phantom"
    | "Glitchpop Phantom"
    | "Singularity Phantom"
    | "Rush Phantom"
    | "Prime//2.0 Phantom"
    | "Avalanche Phantom"
    | "Prism Phantom"
    | "Serenity Phantom"
    | "Ruination Phantom"
    | "Kingdom Phantom"
    | "Smite Phantom"
    | "Celestial Phantom"
    | "Spline Phantom"
    | "Minima Phantom"
    | "Galleria Phantom"
    | "Silvanus Phantom"
    | "Ion Phantom"
    | "Oni Phantom"
    | "Artisan Phantom"
    | "Lightwave Phantom"
    | "Recon Phantom"
    | "Infinity Phantom"
    | "Standard Phantom"
    | "BlastX Phantom"
    | "Winterwunderland Phantom";

export type JudgeSkins =
    | "Glitchpop Judge"
    | "Elderflame Judge"
    | "Rush Judge"
    | "dot EXE Judge"
    | "Outpost Judge"
    | "Prism III Judge"
    | "Serenity Judge"
    | "Smite Judge"
    | "Celestial Judge"
    | "Luxe Judge"
    | "POLYfox Judge"
    | "Jigsaw Judge"
    | "Sensation Judge"
    | "Standard Judge"
    | "Convex Judge"
    | "Varnish Judge";

export type BuckySkins =
    | "Origin Bucky"
    | "Red Alert Bucky"
    | "Surge Bucky"
    | "Horizon Bucky"
    | "Monarch Bucky"
    | "Prime//2.0 Bucky"
    | "Prism II Bucky"
    | "Kingdom Bucky"
    | "Magepunk Bucky"
    | "Galleria Bucky"
    | "Ion Bucky"
    | "Oni Bucky"
    | "Artisan Bucky"
    | "Gravitational Uranium Neuroblaster Bucky"
    | "Lightwave Bucky"
    | "Cavalier Bucky"
    | "Standard Bucky"
    | "Aerosol Bucky";

export type FrenzySkins =
    | "RagnaRocker Frenzy"
    | "Origin Frenzy"
    | "Glitchpop Frenzy"
    | "Elderflame Frenzy"
    | "Rush Frenzy"
    | "Swooping Frenzy"
    | "Horizon Frenzy"
    | "Monarch Frenzy"
    | "Prime//2.0 Frenzy"
    | "Couture Frenzy"
    | "Celestial Frenzy"
    | "Spitfire Frenzy"
    | "Sensation Frenzy"
    | "Lightwave Frenzy"
    | "Standard Frenzy"
    | "BlastX Frenzy";

export type ClassicSkins =
    | "Spectrum Classic"
    | "Pistolinha Classic"
    | "Red Alert Classic"
    | "Glitchpop Classic"
    | "Surge Classic"
    | "Songsteel Classic"
    | "Forsaken Classic"
    | "FIRE/arm Classic"
    | "Prime Classic"
    | "Avalanche Classic"
    | "Prism III Classic"
    | "Kingdom Classic"
    | "Smite Classic"
    | "Spline Classic"
    | "Galleria Classic"
    | "Gravitational Uranium Neuroblaster Classic"
    | "Sakura Classic"
    | "Infinity Classic"
    | "Standard Classic"
    | "Final Chamber Classic";

export type GhostSkins =
    | "VALORANT GO! Vol. 1 Ghost"
    | "dot EXE Ghost"
    | "Hush Ghost"
    | "Infantry Ghost"
    | "Outpost Ghost"
    | "Prism Ghost"
    | "Serenity Ghost"
    | "Ruination Ghost"
    | "Luxe Ghost"
    | "Magepunk Ghost"
    | "Artisan Ghost"
    | "Jigsaw Ghost"
    | "Eclipse Ghost"
    | "Sovereign Ghost"
    | "Tethered Realms Ghost"
    | "Recon Ghost"
    | "Cavalier Ghost"
    | "Standard Ghost"
    | "Depths Ghost"
    | "Ego Ghost"
    | "Vendetta Ghost"
    | "Winterwunderland Ghost"
    | "Soul Silencer Ghost";

export type SheriffSkins =
    | "Aristocrat Sheriff"
    | "Nebula Sheriff"
    | "Singularity Sheriff"
    | "Surge Sheriff"
    | "Protektor Sheriff"
    | "Prism II Sheriff"
    | "K/TAC Sheriff"
    | "Minima Sheriff"
    | "Silvanus Sheriff"
    | "Ion Sheriff"
    | "POLYfox Sheriff"
    | "POLYfrog Sheriff"
    | "Lightwave Sheriff"
    | "Sakura Sheriff"
    | "Peacekeeper Sheriff"
    | "Sentinels of Light Sheriff"
    | "Reaver Sheriff"
    | "Standard Sheriff"
    | "Convex Sheriff"
    | "Varnish Sheriff"
    | "Wasteland Sheriff"
    | "Game Over Sheriff"
    | "Death Wish Sheriff";

export type ShortySkins =
    | "Hivemind Shorty"
    | "Ruin Shorty"
    | "Monarch Shorty"
    | "Prism II Shorty"
    | "Wunderkind Shorty"
    | "Oni Shorty"
    | "Snakebite Shorty"
    | "Standard Shorty"
    | "Aerosol Shorty"
    | "Wasteland Shorty";

export type OperatorSkins =
    | "Origin Operator"
    | "Red Alert Operator"
    | "Glitchpop Operator"
    | "Elderflame Operator"
    | "Nitro Operator"
    | "Forsaken Operator"
    | "Infantry Operator"
    | "Prism Operator"
    | "K/TAC Operator"
    | "Luxe Operator"
    | "Spline Operator"
    | "Minima Operator"
    | "Silvanus Operator"
    | "Ion Operator"
    | "Gravitational Uranium Neuroblaster Operator"
    | "Sentinels of Light Operator"
    | "Reaver Operator"
    | "Tethered Realms Operator"
    | "Cavalier Operator"
    | "Standard Operator"
    | "Aerosol Operator"
    | "Convex Operator";

export type GuardianSkins =
    | "VALORANT GO! Vol. 1 Guardian"
    | "Spectrum Guardian"
    | "Nebula Guardian"
    | "Nitro Guardian"
    | "Songsteel Guardian"
    | "Ruin Guardian"
    | "Infantry Guardian"
    | "Prime Guardian"
    | "Ruination Guardian"
    | "Galleria Guardian"
    | "Oni Guardian"
    | "POLYfox Guardian"
    | "Jigsaw Guardian"
    | "Reaver Guardian"
    | "Sovereign Guardian"
    | "Tethered Realms Guardian"
    | "Recon Guardian"
    | "Infinity Guardian"
    | "Standard Guardian"
    | "Ego Guardian";

export type MarshalSkins =
    | "Songsteel Marshal"
    | "Ruin Marshal"
    | "Monarch Marshal"
    | "Avalanche Marshal"
    | "Couture Marshal"
    | "Magepunk Marshal"
    | "Galleria Marshal"
    | "POLYfrog Marshal"
    | "Artisan Marshal"
    | "Sovereign Marshal"
    | "Standard Marshal"
    | "Wasteland Marshal"
    | "Winterwunderland Marshal";

export type SpectreSkins =
    | "VALORANT GO! Vol. 1 Spectre"
    | "Singularity Spectre"
    | "Hivemind Spectre"
    | "Forsaken Spectre"
    | "Infantry Spectre"
    | "Horizon Spectre"
    | "Prime Spectre"
    | "Avalanche Spectre"
    | "Prism Spectre"
    | "Serenity Spectre"
    | "Ruination Spectre"
    | "Kingdom Spectre"
    | "Luxe Spectre"
    | "Magepunk Spectre"
    | "Spline Spectre"
    | "Minima Spectre"
    | "POLYfrog Spectre"
    | "Gravitational Uranium Neuroblaster Spectre"
    | "Recon Spectre"
    | "Infinity Spectre"
    | "Standard Spectre"
    | "Convex Spectre"
    | "BlastX Spectre"
    | "Wasteland Spectre";

export type StingerSkins =
    | "Aristocrat Stinger"
    | "Red Alert Stinger"
    | "Surge Stinger"
    | "Prism II Stinger"
    | "Couture Stinger"
    | "Silvanus Stinger"
    | "Sensation Stinger"
    | "Sakura Stinger"
    | "Sovereign Stinger"
    | "Cavalier Stinger"
    | "Standard Stinger"
    | "Depths Stinger"
    | "Ego Stinger"
    | "Varnish Stinger";

export type KnifeSkins =
    | "VALORANT GO! Vol. 1 Knife"
    | "Waveform"
    | "Origin Crescent Blade"
    | "Nebula Knife"
    | "Glitchpop Dagger"
    | "Glitchpop Axe"
    | "Elderflame Dagger"
    | "Singularity Knife"
    | "Songsteel"
    | "Hivemind Sword"
    | "Forsaken Ritual Blade"
    | "Ruin Dagger"
    | "Prime Axe"
    | "Prime//2.0 Karambit"
    | "Outpost Melee"
    | "Prism Knife"
    | "Prism III Axe"
    | "Broken Blade of the Ruined King"
    | "Kingdom Knife"
    | "K/TAC Blade"
    | "Smite Knife"
    | "Celestial Fan"
    | "Luxe Knife"
    | "Magepunk Electroblade"
    | "Spline Dagger"
    | "Ion Energy Sword"
    | "Oni Claw"
    | "Artisan Foil"
    | "Gravitational Uranium Neuroblaster Baton"
    | "Relic of the Sentinel"
    | "Reaver Knife"
    | "Sovereign Sword"
    | "Prosperity"
    | "Recon Balisong"
    | "Ego Knife"
    | "BlastX Polymer KnifeTech Coated Knife"
    | "Winterwunderland Candy Cane";

export const knifeSkinsIdMappedByName: Record<KnifeSkins, string> = {
    "VALORANT GO! Vol. 1 Knife": "9103FDF7-4361-5AC5-37AE-7CB51F13F45D",
    Waveform: "400BB847-4F4F-A39E-CD52-589F00B2204F",
    "Origin Crescent Blade": "AC687FC4-40C5-4C41-6A7C-5EB59ADABD60",
    "Nebula Knife": "A4C41553-4BA5-EFEE-5685-7A9F0CDF7878",
    "Glitchpop Dagger": "DDC025B2-475F-889A-2800-80B4215582BC",
    "Glitchpop Axe": "F0C42E14-4A92-132D-DFD4-CBBEF103340C",
    "Elderflame Dagger": "94B40026-4EFB-39EA-69D7-FCA60BE39C56",
    "Singularity Knife": "151EE26C-4E82-E7CA-DAD1-099E7FB34774",
    Songsteel: "45129867-4977-E2A5-BEAD-CB828101B623",
    "Hivemind Sword": "24CF2882-48C7-F287-155A-A4B6B083BAA4",
    "Forsaken Ritual Blade": "ED792F00-43A7-CC88-B64B-B78C9DE399A1",
    "Ruin Dagger": "9C350EBE-458B-E6ED-AB77-2FB00CF249C1",
    "Prime Axe": "E100DFF1-4CF5-54EC-AA65-6FADBC22973B",
    "Prime//2.0 Karambit": "9237E734-4A2A-38AE-7438-6CBEE901877D",
    "Outpost Melee": "908BE835-43BC-B728-35A4-0FA91F612CC0",
    "Prism Knife": "6FA830C2-4924-87B2-1510-2FA4FBDCA1DB",
    "Prism III Axe": "0C07C7F3-4532-BC57-D474-26B3B39A38E6",
    "Broken Blade of the Ruined King": "B1E9530D-4618-4F2E-1B75-F1A90C91B19E",
    "Kingdom Knife": "F82AA022-4A6C-FA40-105D-92AF6510AE1B",
    "K/TAC Blade": "83E8641B-41D0-821D-5EEB-5999E9294A0C",
    "Smite Knife": "46163791-47B9-2EF0-D255-AAA5146051BB",
    "Celestial Fan": "7D45AAAD-4AC9-77B1-E7CA-3991BE5721DD",
    "Luxe Knife": "4AF88517-4949-9CAA-9DDA-1980F07202A4",
    "Magepunk Electroblade": "C18E781E-40A0-80E6-256A-54AE7355E7EB",
    "Spline Dagger": "F6CFD500-4EAB-3C1D-9EEB-188E90731692",
    "Ion Energy Sword": "46664F5B-49CA-3E09-4FE5-56BDEF536335",
    "Oni Claw": "206FC3FE-45A0-6C19-C367-229B98B6A2AA",
    "Artisan Foil": "C39F405F-42F1-ACD1-A350-D3AF39C32E33",
    "Gravitational Uranium Neuroblaster Baton": "0357CAF1-41A9-CB1C-C080-38AAB13D9A7E",
    "Relic of the Sentinel": "6FD8CC46-48B3-F02C-46E3-CBA372E7A328",
    "Reaver Knife": "0AECB2B8-49CC-560E-42C7-6CBCE44F05CF",
    "Sovereign Sword": "2E77AC95-4681-3D87-BBDC-93A50FF6B1F6",
    Prosperity: "F4E40444-43F3-E6F7-3271-BDB7D1492B05",
    "Recon Balisong": "39CF499B-4F82-E875-5320-B0A1D7FC58D4",
    "Ego Knife": "C52FE5D7-4500-FFC0-CBCD-BFA29B7EA040",
    "BlastX Polymer KnifeTech Coated Knife": "5844CCD5-4A8D-E84D-B5B1-DFAAA8F34D84",
    "Winterwunderland Candy Cane": "E49C0FD2-435C-2C41-9164-4996080F455B",
};

export const stingerSkinsIdMappedByName: Record<StingerSkins, string> = {
    "Aristocrat Stinger": "42DA0F19-4017-5CB8-08A4-368315561FDF",
    "Red Alert Stinger": "0CF70376-4150-39AA-5657-8890617BC0D1",
    "Surge Stinger": "0A128CB6-4BBB-F618-85CB-82BBD17BCBB1",
    "Prism II Stinger": "338E3EE3-4927-733F-32B6-BCAC795D23AC",
    "Couture Stinger": "598BB272-4BFD-AE82-0242-6490CC6F721E",
    "Silvanus Stinger": "847FE9DA-45CC-21D4-0138-7AA4D8B31D8E",
    "Sensation Stinger": "9D7ED392-4C4C-B1C4-7232-3CBB07B2E133",
    "Sakura Stinger": "1CD6F578-483B-37A1-A7EF-9A907FAC416A",
    "Sovereign Stinger": "8FB27BB1-4080-581D-BCD3-53AE01861654",
    "Cavalier Stinger": "51E2B876-4339-521D-8D68-9AAEC119BC1F",
    "Standard Stinger": "940FB417-4A9C-3004-41F5-3E8F1F4178B2",
    "Depths Stinger": "E1297B8F-4374-3131-27A9-38BB0EDA1C0D",
    "Ego Stinger": "8FE5EBBC-4CE7-A248-9766-288441706E0A",
    "Varnish Stinger": "26FBCF26-4135-B8E3-277E-8A9C27E3D34D",
};

export const spectreSkinsIdMappedByName: Record<SpectreSkins, string> = {
    "VALORANT GO! Vol. 1 Spectre": "89B78398-4C56-6371-CAD7-8EB78EE3F550",
    "Singularity Spectre": "0EAB3E5C-4DE4-E221-34FB-2AB435C89EB6",
    "Hivemind Spectre": "D405272B-4388-578C-E33B-04842496B8C1",
    "Forsaken Spectre": "A786EA8F-42F2-AE5F-376F-2BB66DF1A62F",
    "Infantry Spectre": "8D4D74C3-4771-52A3-B3EB-A38CC0222643",
    "Horizon Spectre": "EB9EC7C9-4C20-E702-81C7-63BBE165AA12",
    "Prime Spectre": "20807BD8-4259-35E5-E54E-C1B214F58CC8",
    "Avalanche Spectre": "A0938D46-4593-19B4-1AA5-F3B32ECB9963",
    "Prism Spectre": "B9836020-433A-ACE4-EB35-3FBD67688C53",
    "Serenity Spectre": "4643050B-417C-0D84-3626-27B709C49C67",
    "Ruination Spectre": "F9C2E823-4EEB-D872-8A4C-D5A0BF8A3B6C",
    "Kingdom Spectre": "30B19F29-419B-1ADC-3561-40BE2B1F7841",
    "Luxe Spectre": "3EB4D837-4AE9-B52A-B41D-2789F9974F15",
    "Magepunk Spectre": "A3F8E1B3-4654-F3EA-15BA-9EB9FD6A0B0D",
    "Spline Spectre": "418EF9FE-4675-6620-3755-C19ACA3FF131",
    "Minima Spectre": "2D28E21F-4986-650D-70BD-A2927A0E337B",
    "POLYfrog Spectre": "9042279E-4491-1A01-A346-928F89F01EA7",
    "Gravitational Uranium Neuroblaster Spectre": "4A8E8FF6-44F2-0EBF-6FA8-A5AF76B628EE",
    "Recon Spectre": "26B1C794-4370-F354-FF4D-3A8B95EDFF79",
    "Infinity Spectre": "53AB2A6A-46C5-32B9-E045-6781E677D7FF",
    "Standard Spectre": "F01D1307-4299-42F5-2C5E-7DAB7E69AB19",
    "Convex Spectre": "C8A5BA23-4F0D-C7DE-8E2F-C184E2FC27BA",
    "BlastX Spectre": "B4E5BB69-4E12-113F-C43B-EFA5B13CB96D",
    "Wasteland Spectre": "F7DA43D8-450B-A03F-CEB7-C4B20F738392",
};

export const marshalSkinsIdMappedByName: Record<MarshalSkins, string> = {
    "Songsteel Marshal": "51DA27FE-4A3F-016A-D18D-B68A47545F6F",
    "Ruin Marshal": "027A5D7F-4BFC-7C41-A012-24B8C6720FDA",
    "Monarch Marshal": "028C7B80-46EA-8F1D-3F7A-4C9C13A79977",
    "Avalanche Marshal": "DD58AB43-4FF3-659E-8F30-B8BD26619D4D",
    "Couture Marshal": "6F48F7FF-40A5-CC9E-1320-BDAA388F5CBF",
    "Magepunk Marshal": "27AB5ED6-4614-D5C2-C53F-5391FEBE7099",
    "Galleria Marshal": "AD6309B5-4788-D401-33D0-4DBAEEADAF87",
    "POLYfrog Marshal": "6EEA7984-4CA4-D547-4D50-B4A608072FEB",
    "Artisan Marshal": "4986A893-48A5-4C23-11F2-70BB9E9D284D",
    "Sovereign Marshal": "5211EFA8-4EFD-09BB-6CEE-72B86A8A5972",
    "Standard Marshal": "FD44B2D5-49EE-77AB-FA56-588F3AC0C268",
    "Wasteland Marshal": "19F06522-40C8-8DC6-A0CD-92808B24751F",
    "Winterwunderland Marshal": "C31856F4-4AE1-CFB8-14CC-10A92B81E7C3",
};

export const guardianSkinsIdMappedByName: Record<GuardianSkins, string> = {
    "VALORANT GO! Vol. 1 Guardian": "2C32D9E3-42A1-7387-35EF-0C8EEFACEE1C",
    "Spectrum Guardian": "04CCFE05-497C-2D52-2BD0-64A68955175E",
    "Nebula Guardian": "6141A40D-48CF-8466-6D46-558C0FF145EA",
    "Nitro Guardian": "00E6B758-448E-AF3B-7DEE-879AA4A51324",
    "Songsteel Guardian": "2D5E6025-4166-730E-1024-ABB766D19568",
    "Ruin Guardian": "453A734B-4F14-9183-2BE8-97B01F603368",
    "Infantry Guardian": "ACD76D4D-4D05-2597-D63B-12851B2B61EE",
    "Prime Guardian": "2A049F35-4BCD-AF25-21FD-EC942E2D5007",
    "Ruination Guardian": "8966067D-4023-C88A-DB56-2691F163D335",
    "Galleria Guardian": "F097983D-4C5A-C7ED-C325-039C99BB824E",
    "Oni Guardian": "850FEA42-419F-F284-84AE-40AE1EABBB5B",
    "POLYfox Guardian": "96679876-4D41-683C-2E5C-2EA25DDD8FDF",
    "Jigsaw Guardian": "23A16911-4CB1-2794-2D4C-3F99F1E2516B",
    "Reaver Guardian": "DB348DA1-49F2-0BAD-B70A-E4ADE9D31655",
    "Sovereign Guardian": "7122D78B-4E60-EB4D-5F65-738D7C1CE9AE",
    "Tethered Realms Guardian": "77187A8F-4020-DA44-A775-7A91AB814CDF",
    "Recon Guardian": "539E07EC-49B2-5F22-0D05-91B809229D64",
    "Infinity Guardian": "CCE860FD-4F64-7422-5C95-C7AD2CAD0F15",
    "Standard Guardian": "3BF1E8E0-47E8-F27A-6054-929575F41A54",
    "Ego Guardian": "0A81818D-406E-1D8C-CE4D-9BA89DFDF1AB",
};

export const operatorSkinsIdMappedByName: Record<OperatorSkins, string> = {
    "Origin Operator": "17831113-4FF0-A6C9-0B20-6F9C077D74A2",
    "Red Alert Operator": "33AAA643-4BC4-4C5F-2762-228C7FC03949",
    "Glitchpop Operator": "A491B943-43E3-4E98-64A6-FC87FCA43605",
    "Elderflame Operator": "D722313D-43CB-B38D-7841-75880A3ED2CB",
    "Nitro Operator": "44064B11-4E74-19C9-80A4-9F80875ADAF5",
    "Forsaken Operator": "C692E38E-4F38-0141-D0C9-AA99FAB9362A",
    "Infantry Operator": "341EF273-43FB-7911-71E8-50ADADA4CEE1",
    "Prism Operator": "5CED2C69-442E-D1AD-83FE-8FB8B2AC0C0F",
    "K/TAC Operator": "9FFD45C4-4FA4-DCA0-F46F-2D99AD1EAE20",
    "Luxe Operator": "0BD5DA19-491F-DD4A-27E2-C9959B10A87A",
    "Spline Operator": "B2164926-4B85-852A-4BD7-D9BC27A642DA",
    "Minima Operator": "A0A446F1-443D-3DC8-49C7-F2A70849F092",
    "Silvanus Operator": "83B49F36-4085-8179-6896-1A99F2D2D1D8",
    "Ion Operator": "BBF8FFB9-49C0-75C0-CC7D-8F8F03A4BD36",
    "Gravitational Uranium Neuroblaster Operator": "C21E2F34-4B8C-4350-33C8-A8B626ECAADC",
    "Sentinels of Light Operator": "B05C4C98-4108-E442-ADD7-DA99A95A37B6",
    "Reaver Operator": "AECAB890-43B7-D719-06BC-9295E3D116DC",
    "Tethered Realms Operator": "E7BA6CEC-495F-E08E-F8EB-6E90228BDF9E",
    "Cavalier Operator": "D47F9576-426F-4DA3-761D-39967489550C",
    "Standard Operator": "D1F2920F-469A-3431-AD96-96AFBD0017F2",
    "Aerosol Operator": "5F260F34-4021-AB2C-8080-6287C4F9974B",
    "Convex Operator": "CCB54094-4DB8-2C9F-656B-F1BFF329F469",
};

export const shortySkinsIdMappedByName: Record<ShortySkins, string> = {
    "Hivemind Shorty": "3A921C7B-4E8F-8543-BEE8-01BA6DA86874",
    "Ruin Shorty": "1064FBD1-416C-BF00-0E30-A282A359847F",
    "Monarch Shorty": "7A3A9E66-4AC1-DF74-193B-1984303F4F71",
    "Prism II Shorty": "039207FD-4911-9D6B-B7BA-E3ADE36EF77E",
    "Wunderkind Shorty": "310B80D8-4E1B-B4F0-B713-9DAD458CE734",
    "Oni Shorty": "B36DAD11-4105-6C08-0486-17BA96D0F2A4",
    "Snakebite Shorty": "9428E52D-4611-C8FF-1B63-7B8E386FE8CB",
    "Standard Shorty": "48AD078A-4DAE-2B85-A945-F4B6D1EFECBB",
    "Aerosol Shorty": "A39BD1BB-4B17-4D57-C505-7EB15CAFFA4D",
    "Wasteland Shorty": "30635237-4877-4EA4-5AC4-239474D3A662",
};

export const sheriffSkinsIdMappedByName: Record<SheriffSkins, string> = {
    "Aristocrat Sheriff": "840F12D8-467B-1A5E-F79C-B893B72B2FBC",
    "Nebula Sheriff": "55EF0FFA-44FE-03AC-DCF0-1982DF0857AA",
    "Singularity Sheriff": "BFD9E773-4376-1F6A-98F2-DC93F0C0607C",
    "Surge Sheriff": "2674C385-4397-0383-04DF-988D8D6FD2C8",
    "Protektor Sheriff": "4F1FDE01-4130-0AE7-1320-6FB2F2FB6AB9",
    "Prism II Sheriff": "3194B53A-40A9-A419-A8A6-43B1A53CD0E9",
    "K/TAC Sheriff": "95EB82E2-4859-5564-7B3B-DDBF2FB8088D",
    "Minima Sheriff": "46FFE3EA-4FB5-7773-6242-F5B57BF53EF8",
    "Silvanus Sheriff": "721AB58C-4BA2-B7AE-C571-0993D9799FC5",
    "Ion Sheriff": "83778C03-45A3-67A2-3C89-6B8598327D58",
    "POLYfox Sheriff": "54337477-4AEC-4A68-4673-7C8731639D30",
    "POLYfrog Sheriff": "91D95358-4A3E-3ABC-A251-98826225F18D",
    "Lightwave Sheriff": "A5057A74-4A6A-561C-6974-D19A2B939599",
    "Sakura Sheriff": "19B997BB-461A-FA85-250D-A8B0B8908FEA",
    "Peacekeeper Sheriff": "26FF0E3E-469A-CBDD-F79F-A3B89556CDEF",
    "Sentinels of Light Sheriff": "2BA3DED8-47D5-58E3-1307-39800214636D",
    "Reaver Sheriff": "A40A6CE2-462C-C864-5D30-7B9408B98D3D",
    "Standard Sheriff": "1EF6BA68-4DBE-30C7-6BC8-93A6C6F13F04",
    "Convex Sheriff": "E8FD8FC3-40CE-3ED1-235A-1C8D9654874F",
    "Varnish Sheriff": "42EACEAC-46B2-EEC0-2CCA-10937761FE9E",
    "Wasteland Sheriff": "9913DA36-48B4-F0F5-DB4E-43847A21E476",
    "Game Over Sheriff": "121BC438-4748-B2EE-2C58-768C8C26838B",
    "Death Wish Sheriff": "BB0D20C6-415D-CF24-E738-0F99DB6F9195",
};

export const ghostSkinsIdMappedByName: Record<GhostSkins, string> = {
    "VALORANT GO! Vol. 1 Ghost": "3714831B-4B90-BB6B-4185-7FB05BA9B9A2",
    "dot EXE Ghost": "67D3E2F7-4B73-7598-0027-63BD9E2E5FCC",
    "Hush Ghost": "A1D3A9E2-4F61-B1F7-3A01-CF867264D1CB",
    "Infantry Ghost": "65CE6A98-4867-B695-279F-819C44EC6F95",
    "Outpost Ghost": "377EA8AC-46BF-52DA-3173-109C2950DC9D",
    "Prism Ghost": "8163DB1A-4E3C-8F11-92FD-BC9E26253593",
    "Serenity Ghost": "D8314B6C-45FC-FBDA-A797-569A24C11BB9",
    "Ruination Ghost": "8A513C24-4C4D-AC15-6066-A1B2FF577041",
    "Luxe Ghost": "CB98B0D6-4E26-973C-C10D-A38637D04B65",
    "Magepunk Ghost": "33824A13-453B-0636-4EC4-E19708AA934E",
    "Artisan Ghost": "8DFEC665-4836-D498-2896-08A16C092133",
    "Jigsaw Ghost": "F20BDD80-4CBF-67A8-106E-72BBF94336AA",
    "Eclipse Ghost": "4725C2C4-45B7-D9AB-FF4F-A79C3B2DD9EC",
    "Sovereign Ghost": "A9890917-41EA-EB55-47E7-EE990A87FA4E",
    "Tethered Realms Ghost": "EFBD92F3-4ABC-B077-76FD-DC805B3D72A0",
    "Recon Ghost": "BB28991F-4CA9-CA54-962D-31B68C838625",
    "Cavalier Ghost": "153B2B33-4E6C-FB98-42DD-5A9819649DC7",
    "Standard Ghost": "1C63B43B-43C4-04E4-01C9-7AA1BFFA5AC1",
    "Depths Ghost": "69ADDB00-4EB5-EEBB-C4C5-2296549CBA6F",
    "Ego Ghost": "B84DF096-4096-E9C4-0869-8E83E7FC5476",
    "Vendetta Ghost": "0A6EDCF0-4A64-0ED5-1B10-0E96C2EB4CB4",
    "Winterwunderland Ghost": "845A6945-414C-C916-6041-E4A3EF1108CD",
    "Soul Silencer Ghost": "E24330EF-4315-512C-4588-95A601995888",
};

export const classicSkinsIdMappedByName: Record<ClassicSkins, string> = {
    "Spectrum Classic": "46F32F75-4FC8-7121-8A77-DB8DB43AFC67",
    "Pistolinha Classic": "34919680-4F00-554B-0C2B-95ACCA7D0D36",
    "Red Alert Classic": "41FCE834-4C76-A0F4-2CF8-CCA3AE879EAB",
    "Glitchpop Classic": "8B2598EB-4DB9-6338-4A25-C780402C780E",
    "Surge Classic": "6CC70EAE-4297-91D5-ADB9-EFA48004DA77",
    "Songsteel Classic": "10354287-40E9-4087-85C5-AEA7289D31F2",
    "Forsaken Classic": "C612138E-4007-6D0C-64AD-3690C65EE4A7",
    "FIRE/arm Classic": "144AC55D-42B9-338C-FB32-C9A31F4DA5BB",
    "Prime Classic": "D653F4A7-4E92-2559-0A97-2C9D46D009B3",
    "Avalanche Classic": "6B6A219D-490A-45F1-1E5C-40BBF3DF5F28",
    "Prism III Classic": "62ABF8B2-4511-131D-42C9-81A5EFD1B901",
    "Kingdom Classic": "E72D72AB-4284-1469-B544-478A811A29A6",
    "Smite Classic": "22FDC42D-4AD6-2BEC-8033-8A8BDF178826",
    "Spline Classic": "750D4F04-4FEA-391B-FA8B-539815A63164",
    "Galleria Classic": "2F9F4637-4377-B55F-97A1-1E8974E29B27",
    "Gravitational Uranium Neuroblaster Classic": "81DDBFCD-4081-8341-FF76-AD8CDB26CE4C",
    "Sakura Classic": "6BA7A7A0-4057-4D5C-7C98-579F232DB298",
    "Infinity Classic": "706F4A29-4A95-7370-C983-1A8B167E38B7",
    "Standard Classic": "24AEE897-4CDC-B0FD-E596-1BA90FA6D1B2",
    "Final Chamber Classic": "47D5E54A-48E5-B62A-5CF5-3CB7EFC12E90",
};

export const frenzySkinsIdMappedByName: Record<FrenzySkins, string> = {
    "RagnaRocker Frenzy": "7D05D1CE-4BF2-FA96-D8F4-DCA86052E3D2",
    "Origin Frenzy": "CCEB25D7-41E7-1944-515F-2EB5695FD5CC",
    "Glitchpop Frenzy": "5596D764-4B62-210B-59DB-7982E9D4C23F",
    "Elderflame Frenzy": "4FB9EA7D-45A6-9154-7A46-648781B081C4",
    "Rush Frenzy": "A010C5FC-4343-067D-4DFB-EE836EC0A45F",
    "Swooping Frenzy": "D6AF3716-4AB5-8204-A2F4-1EB4FFC51088",
    "Horizon Frenzy": "17162B11-45FC-5B66-2E49-79AC9D60032C",
    "Monarch Frenzy": "B543F6C4-4404-4E5E-1FCF-67A0CD8E9BC4",
    "Prime//2.0 Frenzy": "51446541-47DD-B661-470E-9D89B3B6A33B",
    "Couture Frenzy": "08BFB08F-48CC-2699-2F5C-AABEC43DD43A",
    "Celestial Frenzy": "307DBBC2-442D-B92B-0AF2-278A8505672A",
    "Spitfire Frenzy": "5BB5ACB1-44DD-184B-484E-319188EF78EB",
    "Sensation Frenzy": "531135CC-48CB-68BF-8C99-149E46670C80",
    "Lightwave Frenzy": "F67D4D78-4567-F8CA-010B-18919C49AA05",
    "Standard Frenzy": "F06657F3-48B6-6314-7235-A9A2749DF5B9",
    "BlastX Frenzy": "79005812-4D5C-CC6D-E2BD-19BC86C29349",
};

export const buckySkinsIdMappedByName: Record<BuckySkins, string> = {
    "Origin Bucky": "96495EB3-40DB-CB5B-1C69-17A3DDE58EE3",
    "Red Alert Bucky": "1322A9A8-49AD-BC3A-2319-FB866E21334C",
    "Surge Bucky": "AA6162A5-4C73-1C6F-5C69-9B9082E321FD",
    "Horizon Bucky": "D493BEC2-4E3F-19CD-8363-B1921489413C",
    "Monarch Bucky": "8F26C1E0-46B7-72D2-8307-11B03F3332F2",
    "Prime//2.0 Bucky": "89EEBDB1-4DF6-0A1D-8988-F495CCA4BADB",
    "Prism II Bucky": "A6B07D50-4731-2775-042E-A896CB51BF13",
    "Kingdom Bucky": "75E55415-45CE-B48B-B471-84BEF2368E33",
    "Magepunk Bucky": "5AC14AEF-41CC-A0C8-895F-E1A69B33AEFF",
    "Galleria Bucky": "2A0700DC-4181-AE19-2B49-818B24DCEACB",
    "Ion Bucky": "31F6F214-4379-749A-9285-04A5561E2D03",
    "Oni Bucky": "7DA96A2A-43CE-91C2-28F9-0C95529D133E",
    "Artisan Bucky": "1A97F146-4FCF-5A04-140E-4390FEAFAA73",
    "Gravitational Uranium Neuroblaster Bucky": "0DC9A874-41C5-E582-9A36-37946043346C",
    "Lightwave Bucky": "26582DC8-43DD-15B6-A31C-739B90302BEA",
    "Cavalier Bucky": "E6EEFED6-4D10-5794-4859-6D9AB5FF1D66",
    "Standard Bucky": "70C97FB2-4D79-D4BB-5173-A1888CD4BFD9",
    "Aerosol Bucky": "CF2CC18C-42EC-3FB0-4CA7-3583373A33AB",
};

export const judgeSkinsIdMappedByName: Record<JudgeSkins, string> = {
    "Glitchpop Judge": "28A659A4-439E-FCD0-6236-D39979EE5C51",
    "Elderflame Judge": "0221B120-444B-6D1B-FC50-E4A98E470EB2",
    "Rush Judge": "F6DB3976-4C70-C3BF-01F8-DCA6D335319A",
    "dot EXE Judge": "FBD23FDF-4D7B-8A50-AFA5-C3AD6E7266E5",
    "Outpost Judge": "400D71B1-4090-6ABF-224E-21938569FE24",
    "Prism III Judge": "1FC3F066-4211-D65A-42AB-B287C6BB2448",
    "Serenity Judge": "3A1C857A-4671-0667-8EFE-EE90B8BA1E5A",
    "Smite Judge": "5324BC65-44AA-1A16-EDE4-0E9B56F35D0E",
    "Celestial Judge": "57AD1E5D-4289-4DE0-7926-899CEF10DB37",
    "Luxe Judge": "5237CFCA-4D83-6190-A7F9-D2BDC117EA67",
    "POLYfox Judge": "5D217DD0-4F2C-CFCA-274E-3F8F9D518B13",
    "Jigsaw Judge": "BA93A991-407F-0C47-2D26-72A4196B4164",
    "Sensation Judge": "8E27A0B3-4DC9-E2A7-E33A-29A616EFC244",
    "Standard Judge": "ACD26127-48FF-8B9E-7BA6-B989AF8A4B24",
    "Convex Judge": "03751FA0-46DB-0DF3-B8CB-99ADF373ECDA",
    "Varnish Judge": "87591A69-47C1-A052-BA85-33A8097A0B07",
};

export const phantomSkinsIdMappedByName: Record<PhantomSkins, string> = {
    "VALORANT GO! Vol. 1 Phantom": "0ACBABBE-4F4C-F643-284B-F69029ABB54E",
    "Spectrum Phantom": "980FA063-436E-E51F-C38D-70A5B93A0F1C",
    "Nebula Phantom": "57F91D68-4CDA-76C0-C258-7BA507CD6F87",
    "Glitchpop Phantom": "25A7F0F2-4BCE-7E45-B4B0-CA9264F5DFCC",
    "Singularity Phantom": "5EEC4CE6-443D-E9B5-4C5B-2B967D426BD3",
    "Rush Phantom": "8DB507B5-4D57-96E0-000E-2D8C8AF79550",
    "Prime//2.0 Phantom": "44B7B110-46BF-CCBB-2613-29A5DF296461",
    "Avalanche Phantom": "C38DCED0-454D-D296-522E-6F8643DECD3B",
    "Prism Phantom": "6586A7DB-4041-6A29-F37C-D6817657CAA5",
    "Serenity Phantom": "A903E567-480F-A3F9-ADB8-1DA714A2D63C",
    "Ruination Phantom": "5B43D27B-419C-F2BC-53FE-D7829DAD46B3",
    "Kingdom Phantom": "E13AFE1E-4734-2094-FEE8-9DB016E4D54A",
    "Smite Phantom": "8D3EAD4A-4421-F1F2-4292-ECAC859FC135",
    "Celestial Phantom": "8C0CC1E8-4C1B-20A0-122D-16B4334D1B80",
    "Spline Phantom": "13F553A1-4124-7C29-05E9-E7932FDEABB6",
    "Minima Phantom": "2E3538F1-450F-CFE6-F93E-73862CD39314",
    "Galleria Phantom": "41892314-4A99-0048-1838-E38CD680EA26",
    "Silvanus Phantom": "25824735-478D-30B7-8FC9-95B1999F9D3B",
    "Ion Phantom": "E86BF7E4-4DD3-FBEE-533B-FA875344BBAF",
    "Oni Phantom": "36791B03-452D-8DAD-0091-898CC28D2196",
    "Artisan Phantom": "909DAEA4-49AB-7B99-46FB-AA8C9E6FD837",
    "Lightwave Phantom": "29665396-4DC8-C409-5E38-228949690F1E",
    "Recon Phantom": "D67B929F-4431-61C0-286E-3EBF3D11C4AF",
    "Infinity Phantom": "1F835677-4ED7-FEC2-6B80-C3AC384323F6",
    "Standard Phantom": "337CB216-4A6E-D85D-88C2-F29AB317784C",
    "BlastX Phantom": "59AF9C5D-43EE-1360-F3A7-A9A6FF6E478B",
    "Winterwunderland Phantom": "A5C64455-4FD0-9207-FC97-E086AF99A2A6",
};

export const bulldogSkinsIdMappedByName: Record<BulldogSkins, string> = {
    "Aristocrat Bulldog": "C610DBC8-4A90-3C86-7F9E-BFA910F75BB9",
    "Spectrum Bulldog": "FBE04552-445F-F202-923E-6FBD61B7E2AA",
    "Glitchpop Bulldog": "285C6731-4451-B930-7A3D-C5A736D00F5E",
    "Rush Bulldog": "23399BEB-4828-0D03-AE24-AAA62B08F796",
    "Horizon Bulldog": "E931DCC8-48D4-F895-48B1-199EC573625B",
    "K/TAC Bulldog": "F476843A-4FC1-32A1-5E32-C18B84003460",
    "Couture Bulldog": "199B8536-488A-09E6-8592-FF9CF21B4CEB",
    "POLYfox Bulldog": "DBF7B813-4931-3B45-DB2B-EA8D418B2B1D",
    "Infinity Bulldog": "DECD0962-453A-1551-47E1-1287AAFB5A27",
    "Standard Bulldog": "724A7F42-4315-ECCF-0E76-77BDD3EC2E09",
    "Convex Bulldog": "F580899D-49C4-8BF8-9718-C9A6A38DD503",
    "Depths Bulldog": "4E6341F9-4851-603D-DAFF-9185F007D3DC",
    "Varnish Bulldog": "9BBA8D9A-461E-9783-FCB7-F1A92192FB3A",
};

export const aresSkinsIdMappedByName: Record<AresSkins, string> = {
    "Aristocrat Ares": "8B9855F2-4CC6-0C44-3E7C-D0B2A32C6950",
    "Nebula Ares": "AC65B631-4BD1-B0FA-3313-0DA74D4EBA9D",
    "Singularity Ares": "E901BDEB-405F-D06C-0733-6783274D85B0",
    "Rush Ares": "4E04647A-4CFC-64F8-4643-F6B7DBCB2943",
    "Hivemind Ares": "556646C0-46DD-6986-00DF-A78D1C17F268",
    "Infantry Ares": "E089BE41-4242-B28D-1894-BBBA193957A2",
    "Outpost Ares": "4308FE43-44C1-9FE8-D5F9-95BE2BC70D51",
    "Prism Ares": "841C9AAB-4005-F7FD-3B67-24B335100FB4",
    "Celestial Ares": "D21E2975-4586-635C-3FE4-E6BE738243B3",
    "Minima Ares": "CD8EB70D-443C-D9FD-48CD-98BACE9D5132",
    "POLYfrog Ares": "FF555802-4633-0C8B-93F8-B8887666E3AD",
    "Jigsaw Ares": "E4B7F196-4F05-825F-E795-A59FC829195D",
    "Sakura Ares": "2666F98D-4F88-8CB9-4927-629D75A6A7AD",
    "Sentinels of Light Ares": "9F3E2BA6-428F-C635-67E0-B8B7D9E3C2FC",
    "Standard Ares": "5305D9C4-4F46-FBF4-9E9A-DEA772C263B5",
};

export const odinSkinsIdMappedByName: Record<OdinSkins, string> = {
    "Glitchpop Odin": "97AF88E4-4176-9FA3-4A26-57919443DAB7",
    "Nitro Odin": "2715F184-46CC-BEC1-DD7C-E7B4D1AEB625",
    "dot EXE Odin": "CDA41B87-4D3A-C17C-5F6D-8990CC9C5EFB",
    "Prime//2.0 Odin": "157BCEBE-484D-82E2-2A60-C8B4B11197EA",
    "Prism III Odin": "72E724E9-4BA4-2D12-CE1A-8DB1A528B9D3",
    "Smite Odin": "9E648B20-4ED5-1F34-87A9-979CBE9A958A",
    "Sensation Odin": "65BAA0CD-42EC-F99D-54A0-338D795B5824",
    "Lightwave Odin": "57523CF0-4574-968B-9F17-168E3BDB6D0D",
    "Standard Odin": "F454EFD1-49CB-372F-7096-D394DF615308",
    "Aerosol Odin": "BEFA2F32-410F-A418-D8D3-B194DCF2EC6D",
    "BlastX Odin": "85ED3F9D-4E59-A709-8FAF-BC86EFFB3A07",
};

export const vandalSkinsIdMappedByName: Record<VandalSkins, string> = {
    "Aristocrat Vandal": "6191BB0B-456F-1A3E-DF13-CDB0C1B8B1E4",
    "Origin Vandal": "6C4315B8-4FF1-BAAA-5AAC-5790C7443353",
    "Glitchpop Vandal": "74789F33-4632-8052-96D7-258538721A32",
    "Elderflame Vandal": "18609205-4EDB-5966-CFF8-0FBA0230BA1E",
    "Nitro Vandal": "9B62FAF1-416C-B736-0EDB-39B890F1F18D",
    "Hivemind Vandal": "F7F63B78-4B12-B21E-A0E7-6BAFBAD81509",
    "Forsaken Vandal": "437307C6-424C-6A48-9738-949B91166353",
    "Ruin Vandal": "948D31A0-4C2A-9C82-2B89-FE9F2EC65036",
    "dot EXE Vandal": "6F3A2A08-4F32-DBDC-8DCA-628A5C840052",
    "Horizon Vandal": "9D71EDB0-453C-DEFA-507D-57AA2935B379",
    "Prime Vandal": "B9EE2457-481C-6776-3F5B-0CA8E8F90C89",
    "Avalanche Vandal": "41B55C92-4AEB-9C86-854A-4ABCD48EA0BA",
    "Prism II Vandal": "A383091D-4C7A-EB6D-0F45-E78232EDE644",
    "K/TAC Vandal": "11A93854-44F0-BD66-F434-3F81744DDD8D",
    "Luxe Vandal": "30FD16AF-4560-B2E2-7780-EE8148A0946A",
    "Silvanus Vandal": "D758ABC0-4D99-62D3-B22B-0DB0E57DE881",
    "Sensation Vandal": "72C1E90B-40CA-4304-02EB-28BB2AEA4ED2",
    "Sakura Vandal": "F946EF5C-46AB-E146-A712-1D99A1651356",
    "Sentinels of Light Vandal": "E8DF3725-40DE-B8EC-77BD-62A989685A85",
    "Reaver Vandal": "30388628-42F0-606C-82C0-73AD43DE997F",
    "Tethered Realms Vandal": "F2B034E0-4B54-5ABC-25C8-D293B6F1D247",
    "Cavalier Vandal": "1EB7639F-4E90-5B5B-9F53-A792103D6F29",
    "Standard Vandal": "27F21D97-4C4B-BD1C-1F08-31830AB0BE84",
    "Depths Vandal": "F2871246-441C-5F41-3DAC-13947139ADEC",
    "Ego Vandal": "8C22A4B2-4DA0-F2F2-9BD1-C89D106CD646",
    "Wasteland Vandal": "32B87592-45AD-C5A6-44AE-A9B844137C58",
    "Winterwunderland Vandal": "16716D68-4D36-320F-AAFD-F6A6BFA5ABE2",
};

export const gunsIdMappedByName: Record<Guns, string> = {
    Ares: "55D8A0F4-4274-CA67-FE2C-06AB45EFDF58",
    Bucky: "910BE174-449B-C412-AB22-D0873436B21B",
    Bulldog: "AE3DE142-4D85-2547-DD26-4E90BED35CF7",
    Classic: "C5DE005C-4BDC-26A7-A47D-C295EAAAE9D8",
    Frenzy: "44D4E95C-4157-0037-81B2-17841BF2E8E3",
    Ghost: "1BAA85B4-4C70-1284-64BB-6481DFC3BB4E",
    Guardian: "4ADE7FAA-4CF1-8376-95EF-39884480959B",
    Judge: "EC845BF4-4F79-DDDA-A3DA-0DB3774B2794",
    Marshal: "C4883E50-4494-202C-3EC3-6B8A9284F00B",
    Knife: "2F59173C-4BED-B6C3-2191-DEA9B58BE9C7",
    Odin: "63E6C2B6-4A8E-869C-3D4C-E38355226584",
    Operator: "A03B24D3-4319-996D-0F8C-94BBFBA1DFC7",
    Phantom: "EE8E8D15-496B-07AC-E5F6-8FAE5D4C7B1A",
    Sheriff: "E336C6B8-418D-9340-D77F-7A9E4CFE0702",
    Shorty: "42DA8CCC-40D5-AFFC-BEEC-15AA47B42EDA",
    Spectre: "462080D1-4035-2937-7C09-27AA2A5C27A7",
    Stinger: "F7E1B454-4AD4-1063-EC0A-159E56B58941",
    Vandal: "9C82E19D-4575-0200-1A81-3EACF00CF872",
};
