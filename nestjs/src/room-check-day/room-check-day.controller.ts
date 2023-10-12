import {Controller, Get} from "@nestjs/common";
import {RoomCheckDayService} from "./room-check-day.service";
import {ApiOperation } from '@nestjs/swagger';

@Controller('room-check-day')
export class RoomCheckDayController {
    constructor(
        private readonly roomCheckDayService: RoomCheckDayService,
    ) {}

    @ApiOperation({summary: '점호에 관련된 API'})
    @Get()
    roomCheckDay(){
        return '점호날'
    }
}
