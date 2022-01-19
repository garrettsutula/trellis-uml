export default (teamName: string) => `footer ${teamName} Team - %date()

scale max 2048 width

skinparam actor {
  BorderColor Black
  BackgroundColor<< Human >> LightGrey
  BackgroundColor White
}

skinparam folder {
  BorderColor Black
  BackgroundColor<< Human >> LightGrey
  BackgroundColor White
}

skinparam ArrowColor Black
skinparam BackgroundColor White
skinparam CloudBackgroundColor white
skinparam DatabaseBackgroundColor White
skinparam NodeBackgroundColor white

skinparam class {
    BackgroundColor LightGrey
    BorderColor Black
}

skinparam note {
  BackgroundColor #FFEFD7
  BorderColor Black
}

skinparam boundary {
  BackgroundColor White
  BorderColor Black
  FontColor Black
}

skinparam participant {
  BackgroundColor White
  BorderColor Black
  FontColor Black
}

skinparam card {
  BackgroundColor White
  BorderColor Black
}

skinparam queue {
  BackgroundColor White
  BorderColor Black
  FontColor Black
}

skinparam state {
  BackgroundColor White
  BorderColor Black
  FontColor Black
}

skinparam storage {
  BackgroundColor White
  BorderColor Black
  FontColor Black
}

skinparam collections {
  BackgroundColor White
  BorderColor Black
  FontColor Black
}

skinparam entity {
  BackgroundColor White
  BorderColor Black
  FontColor Black
}

skinparam SequenceBoxBorderColor Black

skinparam EntityBackgroundColor White
skinparam EntityBorderColor Black

skinparam activity {
  BackgroundColor white
  BarColor black
  BorderColor black
  DiamondBackgroundColor white
  DiamondBorderColor black
  EndColor black
  StartColor black
}

skinparam sequence {
    MessageAlignment left

    LifeLineBorderColor Black
    LifeLineBackgroundColor White
}

skinparam usecase {
  BackgroundColor White
  BorderColor Black

  BackgroundColor<< Main >> YellowGreen
  BorderColor<< Main >> YellowGreen
}

skinparam interface {
    BackgroundColor White

    BorderColor Black
}

skinparam component {
    BackgroundColor White
  
    BorderColor Black
}

skinparam rectangle {
    BackgroundColor White
    roundCorner 25
}`;
