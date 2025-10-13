import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OnboardingController } from './controllers/onboarding.controller';
import { OnboardingService } from './services/onboarding.service';

@Module({
  imports: [
    HttpModule,
    // MikroOrmModule.forFeature([Users, Organizations])
    // TemporalModule.register({
    //   connection: {
    //     address: 'localhost:7233'
    //   },
    //   taskQueue: 'user-queue',
    //   worker: {
    //     workflowsPath: __dirname + '\\workflows',
    //     activityClasses: [
    //       CreateUserActivity,
    //       PersistBankRecordsActivity,
    //       ProvisionBankAccountsActivity
    //     ],
    //     autoStart: true
    //   }
    // }),
  ],
  controllers: [OnboardingController],
  providers: [
    OnboardingService, 
    // CreateUserActivity, 
    // ProvisionBankAccountsActivity, 
    // PersistBankRecordsActivity, 
    // PalmpayService, 
    // PouchiiService
  ]
})
export class UsersModule { }
