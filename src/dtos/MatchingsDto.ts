import { DestinationDto } from "./DestinationDto";

export class MatchingsDto {
    constructor(
        public id: string,
        public destination: DestinationDto,
        public matchedDestinations: DestinationDto[]
      ) {}
}