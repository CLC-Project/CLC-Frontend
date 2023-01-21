export class DestinationDto {
    constructor(
        public id: string,
        public country: string,
        public region: string,
        public city: string,
        public user: string
      ) {}
}