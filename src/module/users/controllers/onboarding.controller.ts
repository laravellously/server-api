import { Body, Controller, Post, Put } from '@nestjs/common';
import { StepOneFlowDto, StepTwoFlowDto } from '../dto/onboarding.dto';
import { OnboardingService } from '../services/onboarding.service';
import { ApiBody } from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) { }

  // @AllowAnonymous()
  @Post('start')
  async stepOneFlow(@Body() body: StepOneFlowDto) {
    // bvn, businessName, registrationNumber
    try {
      // create organization
      const org = await this.onboardingService.processCreateOrg(body)
      // create user from bvn
      const result = await this.onboardingService.processCreateUser(body, org)

      return {
        ...result,
        message: "User created successfully",
        status: true
      };
    } catch (error) {
      throw new Error(error.message)
    }
  }

  @Post('finish')
  async stepTwoFlow(@Body() body: StepTwoFlowDto) {
    // industry, streetAddress, city, state, orgId
    // update business
    console.log(StepTwoFlowDto)
  }
}
