import { assistantBaseApi } from './baseApi.ts';
import { UserToKickAdviceDto } from '../../models/dto/UserToKickAdviceDto.ts';
import { GoldenBallsDeclarationAdviceDto } from '../../models/dto/GoldenBallsDeclarationAdviceDto.ts';

const injectedRtkApi = assistantBaseApi.injectEndpoints({
    endpoints: (builder) => ({
        userToKickAdvice: builder.mutation<void, UserToKickAdviceDto>({
            query: (userToKickAdviceDto) => ({
                url: 'game-assistant/user-to-kick-advice',
                method: 'POST',
                body: userToKickAdviceDto,
            }),
        }),
        goldenBallsDeclarationAdvice: builder.mutation<
            void,
            GoldenBallsDeclarationAdviceDto
        >({
            query: (goldenBallsDeclarationAdviceDto) => ({
                url: 'game-assistant/golden-balls-declaration-advice',
                method: 'POST',
                body: goldenBallsDeclarationAdviceDto,
            }),
        }),
        messageToConvinceUserToSplit: builder.mutation<void, void>({
            query: () => ({
                url: 'game-assistant/message-to-convince-opponent-to-split',
                method: 'POST',
            }),
        }),
    }),
    overrideExisting: false,
});

export { injectedRtkApi as assistantApi };
export const {
    useUserToKickAdviceMutation,
    useGoldenBallsDeclarationAdviceMutation,
    useMessageToConvinceUserToSplitMutation,
} = injectedRtkApi;
