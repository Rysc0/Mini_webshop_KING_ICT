USE [master]
GO
/****** Object:  Database [Webshop_KING]    Script Date: 23.7.2021. 10:24:28 ******/
CREATE DATABASE [Webshop_KING]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Webshop_KING', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Webshop_KING.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Webshop_KING_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Webshop_KING_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Webshop_KING] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Webshop_KING].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Webshop_KING] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Webshop_KING] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Webshop_KING] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Webshop_KING] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Webshop_KING] SET ARITHABORT OFF 
GO
ALTER DATABASE [Webshop_KING] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Webshop_KING] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Webshop_KING] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Webshop_KING] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Webshop_KING] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Webshop_KING] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Webshop_KING] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Webshop_KING] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Webshop_KING] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Webshop_KING] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Webshop_KING] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Webshop_KING] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Webshop_KING] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Webshop_KING] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Webshop_KING] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Webshop_KING] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Webshop_KING] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Webshop_KING] SET RECOVERY FULL 
GO
ALTER DATABASE [Webshop_KING] SET  MULTI_USER 
GO
ALTER DATABASE [Webshop_KING] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Webshop_KING] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Webshop_KING] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Webshop_KING] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Webshop_KING] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Webshop_KING] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Webshop_KING', N'ON'
GO
ALTER DATABASE [Webshop_KING] SET QUERY_STORE = OFF
GO
USE [Webshop_KING]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 23.7.2021. 10:24:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brand](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Naziv] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Bran] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Nacin_placanja]    Script Date: 23.7.2021. 10:24:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Nacin_placanja](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Naziv] [varchar](10) NOT NULL,
 CONSTRAINT [PK_Nacin_placanj] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Narudzba]    Script Date: 23.7.2021. 10:24:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Narudzba](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Datum] [date] NOT NULL,
	[Ukupna_Cijena_Bez_P] [float] NOT NULL,
	[Ukupna_Cijena_S_P] [float] NOT NULL,
	[Kod_Za_Popust_ID] [int] NOT NULL,
	[Nacin_Placanja_ID] [int] NOT NULL,
	[Broj_Kartice] [varchar](16) NULL,
	[Email] [varchar](50) NOT NULL,
	[Broj_Mobitela] [varchar](13) NOT NULL,
	[Adresa_Dostave] [varchar](50) NOT NULL,
	[Napomena] [varchar](50) NULL,
 CONSTRAINT [PK_Narudzb] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Narudzba_proizvod]    Script Date: 23.7.2021. 10:24:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Narudzba_proizvod](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Narudzba_ID] [int] NOT NULL,
	[Proizvod_ID] [int] NOT NULL,
 CONSTRAINT [PK_Narudzba_proizvod] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Popust_kodovi]    Script Date: 23.7.2021. 10:24:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Popust_kodovi](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Kod] [varchar](10) NOT NULL,
	[Popust] [float] NOT NULL,
	[Iskoristen] [bit] NOT NULL,
 CONSTRAINT [PK_Popust_kodov] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Proizvod]    Script Date: 23.7.2021. 10:24:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Proizvod](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Naziv] [varchar](50) NOT NULL,
	[Opis] [text] NOT NULL,
	[Cijena] [float] NOT NULL,
	[Kolicina] [int] NOT NULL,
	[Brand_ID] [int] NOT NULL,
 CONSTRAINT [PK_Pro] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Brand] ON 

INSERT [dbo].[Brand] ([ID], [Naziv]) VALUES (1, N'Logitech')
INSERT [dbo].[Brand] ([ID], [Naziv]) VALUES (2, N'Razer')
INSERT [dbo].[Brand] ([ID], [Naziv]) VALUES (3, N'Redragon')
INSERT [dbo].[Brand] ([ID], [Naziv]) VALUES (4, N'Asus')
SET IDENTITY_INSERT [dbo].[Brand] OFF
GO
SET IDENTITY_INSERT [dbo].[Nacin_placanja] ON 

INSERT [dbo].[Nacin_placanja] ([ID], [Naziv]) VALUES (1, N'KARTICNO')
INSERT [dbo].[Nacin_placanja] ([ID], [Naziv]) VALUES (2, N'GOTOVINSKO')
SET IDENTITY_INSERT [dbo].[Nacin_placanja] OFF
GO
SET IDENTITY_INSERT [dbo].[Popust_kodovi] ON 

INSERT [dbo].[Popust_kodovi] ([ID], [Kod], [Popust], [Iskoristen]) VALUES (1, N'Mrak500', 0.2, 0)
INSERT [dbo].[Popust_kodovi] ([ID], [Kod], [Popust], [Iskoristen]) VALUES (2, N'B0ris50', 0.5, 0)
INSERT [dbo].[Popust_kodovi] ([ID], [Kod], [Popust], [Iskoristen]) VALUES (3, N'Kod25', 0.25, 0)
INSERT [dbo].[Popust_kodovi] ([ID], [Kod], [Popust], [Iskoristen]) VALUES (4, N'Promo30', 0.3, 0)
SET IDENTITY_INSERT [dbo].[Popust_kodovi] OFF
GO
SET IDENTITY_INSERT [dbo].[Proizvod] ON 

INSERT [dbo].[Proizvod] ([ID], [Naziv], [Opis], [Cijena], [Kolicina], [Brand_ID]) VALUES (1, N'Logitech Prodigy Gaming Mouse', N'Logitech Prodigy Gaming Mouse je novi proizvod Logitech-a sa najnovijim senzorom od 8000DPI. ', 273.25, 80, 1)
INSERT [dbo].[Proizvod] ([ID], [Naziv], [Opis], [Cijena], [Kolicina], [Brand_ID]) VALUES (2, N'Redragon Kumara K552', N'Mehanička tipkovnica sa OUTEMU Blue switchevima koji su jako glasni.', 279.2, 50, 3)
INSERT [dbo].[Proizvod] ([ID], [Naziv], [Opis], [Cijena], [Kolicina], [Brand_ID]) VALUES (3, N'Slušalice Razer Kraken X', N'Nove Razerove slušalice, 7.1 Surround, detachable mikrofon', 399, 25, 2)
INSERT [dbo].[Proizvod] ([ID], [Naziv], [Opis], [Cijena], [Kolicina], [Brand_ID]) VALUES (4, N'Monitor ASUS 24" TUF GAMING VG249Q', N'Monitor ASUS 24" TUF GAMING VG249Q, IPS panel, Adaptive-sync, 144hz', 1599, 0, 4)
INSERT [dbo].[Proizvod] ([ID], [Naziv], [Opis], [Cijena], [Kolicina], [Brand_ID]) VALUES (5, N'Monitor ASUS 27" VG278QR', N'Monitor ASUS 27" VG278QR, TN panel, AMD Freesync, 144hz', 2538.17, 1, 4)
SET IDENTITY_INSERT [dbo].[Proizvod] OFF
GO
ALTER TABLE [dbo].[Narudzba]  WITH CHECK ADD  CONSTRAINT [FK_Narudzba_Nacin_placanja] FOREIGN KEY([Nacin_Placanja_ID])
REFERENCES [dbo].[Nacin_placanja] ([ID])
GO
ALTER TABLE [dbo].[Narudzba] CHECK CONSTRAINT [FK_Narudzba_Nacin_placanja]
GO
ALTER TABLE [dbo].[Narudzba]  WITH CHECK ADD  CONSTRAINT [FK_Narudzba_Popust_kodovi] FOREIGN KEY([Kod_Za_Popust_ID])
REFERENCES [dbo].[Popust_kodovi] ([ID])
GO
ALTER TABLE [dbo].[Narudzba] CHECK CONSTRAINT [FK_Narudzba_Popust_kodovi]
GO
ALTER TABLE [dbo].[Narudzba_proizvod]  WITH CHECK ADD  CONSTRAINT [FK_Narudzba_proizvod_Narudzba] FOREIGN KEY([Narudzba_ID])
REFERENCES [dbo].[Narudzba] ([ID])
GO
ALTER TABLE [dbo].[Narudzba_proizvod] CHECK CONSTRAINT [FK_Narudzba_proizvod_Narudzba]
GO
ALTER TABLE [dbo].[Narudzba_proizvod]  WITH CHECK ADD  CONSTRAINT [FK_Narudzba_proizvod_Proizvod] FOREIGN KEY([Proizvod_ID])
REFERENCES [dbo].[Proizvod] ([ID])
GO
ALTER TABLE [dbo].[Narudzba_proizvod] CHECK CONSTRAINT [FK_Narudzba_proizvod_Proizvod]
GO
ALTER TABLE [dbo].[Proizvod]  WITH CHECK ADD  CONSTRAINT [FK_Proizvod_Brand] FOREIGN KEY([Brand_ID])
REFERENCES [dbo].[Brand] ([ID])
GO
ALTER TABLE [dbo].[Proizvod] CHECK CONSTRAINT [FK_Proizvod_Brand]
GO
USE [master]
GO
ALTER DATABASE [Webshop_KING] SET  READ_WRITE 
GO
