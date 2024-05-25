import styled from 'styled-components';
import {
    MAIN_COLOR_BLUE_MARINE,
    MAIN_COLOR_GREY,
    TEXT_COLOR_WHITE,
} from '../../config/Styles.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore.ts';
import { useGetGameHistoryQuery } from '../../store/api/userProfileApi.ts';
import { computeOutcome, getOutcomeColor } from '../../utils/Utils.ts';
import { formatUnixTimestamp } from '../../utils/Format.ts';
import { useNavigate } from 'react-router-dom';

const GameHistoryWrapper = styled.div`
    background: ${MAIN_COLOR_BLUE_MARINE};
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    height: 560px;
    overflow: scroll;
    padding: 24px 48px;
    position: relative;
    width: 360px;
`;

const GameHistoryItemWrapper = styled.div<{ $borderColor: string }>`
    background-color: ${MAIN_COLOR_GREY};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 8px;
`;

const GameHistoryOpponentName = styled.p<{ $color: string }>`
    color: ${(props) => props.$color};
    font-size: 16px;
`;

const GameHistoryPlayedDate = styled.p<{ $color: string }>`
    color: ${(props) => props.$color};
    font-size: 16px;
`;

export const GameHistoryPage = () => {
    const { loggedIn } = useSelector((state: RootState) => state.currentUser);
    const { data } = useGetGameHistoryQuery(null, {
        refetchOnMountOrArgChange: true,
        skip: !loggedIn,
    });
    const navigate = useNavigate();

    const handleClickOnGameHistoryItem = (gameId: string) => {
        navigate(`/game-details/${gameId}`);
    };

    return (
        data && (
            <GameHistoryWrapper>
                {data.map((game) => {
                    const outcome = computeOutcome(
                        game.currentPlayerChoice,
                        game.opponentChoice,
                    );
                    const color = getOutcomeColor(outcome);

                    return (
                        <GameHistoryItemWrapper
                            key={game.id}
                            $borderColor={color}
                            onClick={() =>
                                handleClickOnGameHistoryItem(game.id)
                            }
                        >
                            <GameHistoryOpponentName $color={TEXT_COLOR_WHITE}>
                                {game.opponentName}
                            </GameHistoryOpponentName>
                            <GameHistoryPlayedDate $color={color}>
                                {formatUnixTimestamp(game.creationDate / 1000)}
                            </GameHistoryPlayedDate>
                        </GameHistoryItemWrapper>
                    );
                })}
            </GameHistoryWrapper>
        )
    );
};
