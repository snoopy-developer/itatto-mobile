import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const theme = useTheme();
  const styles = createStylesheet(theme);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4; // Always show 4 numbered page buttons (or 3 with ellipsis)

    if (totalPages <= maxVisiblePages) {
      // Show all pages if totalPages is less than or equal to maxVisiblePages
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      // More pages than can be displayed, add "..." where necessary
      if (currentPage <= 1) {
        // If on page 1 or 2, show [1, 2, ..., lastPage]
        pageNumbers.push(renderPageButton(0));
        pageNumbers.push(renderPageButton(1));
        pageNumbers.push(
          <Text key="dots-right" style={styles.dots}>
            ...
          </Text>,
        );
        pageNumbers.push(renderPageButton(totalPages - 1));
      } else if (currentPage >= totalPages - 2) {
        // If on the last or second last page, show [1, ..., lastPage-1, lastPage]
        pageNumbers.push(renderPageButton(0));
        pageNumbers.push(
          <Text key="dots-left" style={styles.dots}>
            ...
          </Text>,
        );
        pageNumbers.push(renderPageButton(totalPages - 2));
        pageNumbers.push(renderPageButton(totalPages - 1));
      } else {
        // Show [1, ..., currentPage, ..., lastPage]
        pageNumbers.push(renderPageButton(0));
        pageNumbers.push(
          <Text key="dots-left" style={styles.dots}>
            ...
          </Text>,
        );
        pageNumbers.push(renderPageButton(currentPage));
        pageNumbers.push(
          <Text key="dots-right" style={styles.dots}>
            ...
          </Text>,
        );
        pageNumbers.push(renderPageButton(totalPages - 1));
      }
    }

    return pageNumbers;
  };

  const renderPageButton = (pageIndex: number) => (
    <TouchableOpacity
      key={pageIndex}
      style={[
        styles.pageNumber,
        pageIndex === currentPage && styles.activePageNumber,
      ]}
      onPress={() => onPageChange(pageIndex)}
    >
      <Text
        style={[
          styles.pageText,
          pageIndex === currentPage && styles.activePageText,
        ]}
      >
        {pageIndex + 1}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={styles.pageButton}
        onPress={() => onPageChange(0)}
        disabled={currentPage === 0}
      >
        <FontAwesome
          name="angle-double-left"
          size={24}
          color={theme.colors.textDisabled}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pageButton}
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <FontAwesome
          name="angle-left"
          size={24}
          color={theme.colors.textDisabled}
        />
      </TouchableOpacity>

      {renderPageNumbers()}

      <TouchableOpacity
        style={styles.pageButton}
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <FontAwesome
          name="angle-right"
          size={24}
          color={theme.colors.textDisabled}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.pageButton}
        onPress={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
      >
        <FontAwesome
          name="angle-double-right"
          size={24}
          color={theme.colors.textDisabled}
        />
      </TouchableOpacity>
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
    pageButton: {
      backgroundColor: theme.colors.actionSelected,
      alignItems: 'center',
      borderRadius: 8,
      padding: 8,
      aspectRatio: 1,
      width: '11%',
      marginHorizontal: 4,
    },
    pageNumber: {
      backgroundColor: theme.colors.actionSelected,
      borderRadius: 8,
      padding: 8,
      aspectRatio: 1,
      width: '11%',
      marginHorizontal: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activePageNumber: {
      backgroundColor: theme.colors.success500,
    },
    pageText: {
      fontSize: 16,
      color: theme.colors.textPrimary,
      textAlign: 'center',
    },
    activePageText: {
      color: theme.colors.grayLight,
      fontWeight: 'bold',
    },
    dots: {
      fontSize: 16,
      marginHorizontal: 8,
      color: theme.colors.textDisabled,
      alignSelf: 'center',
    },
  });

export default Pagination;
