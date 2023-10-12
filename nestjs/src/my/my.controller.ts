import {Controller, Get} from "@nestjs/common";
import {MyService} from "./my.service";
import {ApiOperation} from "@nestjs/swagger";

@Controller('my')
export class MyController {
    constructor(
        private readonly myService: MyService,
    ) {}

    @ApiOperation({summary: '기숙사 정보에 관련된 API'})
    @Get()
    my(){
        return '기숙사 정보';
    }
}
