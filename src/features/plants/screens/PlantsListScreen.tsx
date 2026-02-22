import React from 'react';
import { FlatList, RefreshControl, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useTranslation } from 'react-i18next';
import { usePlants, useWaterPlant } from '../hooks/usePlants';
import { PlantCard } from '../components/PlantCard';
import { Plant } from '../types';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.lg}px ${({ theme }) => theme.spacing.md}px;
`;

const HeaderTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xxl}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const HeaderSubtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: 4px;
`;

const ListContainer = styled.View`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl}px;
`;

const EmptyEmoji = styled.Text`
  font-size: 64px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const EmptyTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.xl}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const EmptySubtitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  color: ${({ theme }) => theme.colors.text.muted};
  text-align: center;
  line-height: 22px;
`;

const AddButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full}px;
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px;
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  flex-direction: row;
  align-items: center;
`;

const AddButtonText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
`;

const FAB = styled.TouchableOpacity`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl}px;
  right: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 56px;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 6;
`;

const FABText = styled.Text`
  font-size: 28px;
  color: white;
`;

interface PlantsListScreenProps {
  navigation: any;
}

export const PlantsListScreen: React.FC<PlantsListScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { data: plants = [], isLoading, refetch } = usePlants();
  const waterPlant = useWaterPlant();

  const handleWaterPlant = (plant: Plant) => {
    Alert.alert(
      `💧 ${plant.name}`,
      'Mark this plant as watered?',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('plants.card.waterNow'),
          onPress: () => waterPlant.mutate(plant),
        },
      ]
    );
  };

  const handlePlantPress = (plant: Plant) => {
    navigation.navigate('PlantDetail', { plant });
  };

  const handleAddPlant = () => {
    navigation.navigate('AddPlant');
  };

  if (isLoading) {
    return (
      <Container>
        <EmptyContainer>
          <EmptyEmoji>🌱</EmptyEmoji>
        </EmptyContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>🌿 {t('plants.title')}</HeaderTitle>
        <HeaderSubtitle>
          {plants.length === 0
            ? t('plants.empty.subtitle')
            : `${plants.length} plant${plants.length !== 1 ? 's' : ''} in your collection`}
        </HeaderSubtitle>
      </Header>

      {plants.length === 0 ? (
        <EmptyContainer>
          <EmptyEmoji>🪴</EmptyEmoji>
          <EmptyTitle>{t('plants.empty.title')}</EmptyTitle>
          <EmptySubtitle>{t('plants.empty.subtitle')}</EmptySubtitle>
          <AddButton onPress={handleAddPlant} activeOpacity={0.8}>
            <AddButtonText>+ {t('plants.empty.addButton')}</AddButtonText>
          </AddButton>
        </EmptyContainer>
      ) : (
        <ListContainer>
          <FlatList
            data={plants}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PlantCard
                plant={item}
                onPress={handlePlantPress}
                onWater={handleWaterPlant}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </ListContainer>
      )}

      {plants.length > 0 && (
        <FAB onPress={handleAddPlant} activeOpacity={0.8}>
          <FABText>+</FABText>
        </FAB>
      )}
    </Container>
  );
};
