# WinterWalrus.com DeFi Operations Guide

This guide provides precise, actionable instructions for performing DeFi operations in your project, referencing only the components, hooks, and architecture present in your codebase.

---

## 1. Staking an NFT

### User Flow

1. **Connect Wallet:**  
   The user connects their wallet using the wallet integration provided by `@mysten/dapp-kit`. This is typically handled at the app layout or header level, making the user's address available via `useCurrentAccount()`.

2. **Navigate to Staking:**  
   The user goes to the staking section, implemented in `views/stake/components/nft/nft-assets/`. This section lists available NFTs for staking.

3. **Select NFT and Stake:**  
   The user selects an NFT and clicks the "Stake" button. The button is rendered for each NFT item.

### Code Implementation

- **Component:**  
  NFT staking UI and logic are in `views/stake/components/nft/nft-assets/`.

- **State Management:**  
  Use the `useAppState` hook to update balances and staking objects after staking.

- **Transaction:**  
  The staking transaction is handled by the `useStakingAction` hook in `staking-assets-item.hooks/index.tsx`.

#### Example

```tsx
// filepath: views/stake/components/nft/nft-assets/YourStakingComponent.tsx
import { useStakingAction } from './staking-assets-item.hooks';
import { useCurrentAccount } from '@mysten/dapp-kit';

const stakingObject = /* get staking object from state or props */;
const isActivated = (epoch: number) => /* your eligibility logic */;
const { onBurn, loading } = useStakingAction(stakingObject, isActivated);

return (
  <button onClick={onBurn} disabled={loading}>
    Stake
  </button>
);
```

- The `onBurn` function handles the staking logic, shows loading toasts, and updates state on success.
- The UI will reflect the updated state automatically due to React state/context.

---

## 2. Unstaking an NFT

### User Flow

1. **Go to Staked NFTs:**  
   User navigates to their staked NFTs list, rendered using the same or similar components as staking.

2. **Click "Unstake":**  
   User clicks the "Unstake" button for the desired NFT.

### Code Implementation

- **Component:**  
  The unstake UI is in `views/stake/components/nft/nft-assets/`.

- **Logic:**  
  The `useStakingAction` hook handles unstaking. If the NFT is of type `TYPES.STAKED_WAL`, a modal is shown for confirmation using `StakingAssetsItemModal` from `staking-assets-item-modals.tsx` and managed via `useModal`.

#### Example

```tsx
// filepath: views/stake/components/nft/nft-assets/YourUnstakingComponent.tsx
import { useStakingAction } from './staking-assets-item.hooks';

const { onBurn, loading } = useStakingAction(stakingObject, isActivated);

return (
  <button onClick={onBurn} disabled={loading}>
    Unstake
  </button>
);
```

- When the NFT is of type `TYPES.STAKED_WAL`, the modal provides additional instructions or confirmation before proceeding.

---

## 3. Withdrawing (Burning) a Staked Asset

### User Flow

1. **Go to Staked Assets:**  
   User navigates to their staked assets, displayed in the same NFT assets section.

2. **Click "Withdraw" or "Burn":**  
   User clicks the withdraw/burn button for the eligible asset.

### Code Implementation

- **Component:**  
  The withdraw/burn UI is in `views/stake/components/nft/nft-assets/`.

- **Logic:**  
  The `useStakingAction` hook's `onBurn` function checks eligibility (using `isActivated`) and calls the `useBurn` hook for the transaction. The `useBurn` hook is defined in `staking-assets-item.hooks/use-burn.ts`.

#### Example

```tsx
// filepath: views/stake/components/nft/nft-assets/YourWithdrawComponent.tsx
import { useStakingAction } from './staking-assets-item.hooks';

const { onBurn, loading } = useStakingAction(stakingObject, isActivated);

return (
  <button onClick={onBurn} disabled={loading}>
    Withdraw
  </button>
);
```

- The `useBurn` hook executes the blockchain transaction, updates state via `useAppState`, and provides user feedback via `toasting`.

---

## 4. Swapping Tokens

### User Flow

1. **Go to Swap Section:**  
   User navigates to the swap section (not implemented).

2. **Select Tokens and Amount:**  
   User selects tokens and enters the amount.

3. **Click "Swap":**  
   User clicks the swap button.

### Code Implementation

- **Component:**  
  There is currently no swap UI or logic in your codebase.

- **Logic:**  
  To implement swapping:
  - Create a new hook (e.g., `useSwap`) for swap transactions.
  - Add a swap form UI.
  - Use `useAppState` to update balances after a swap.

---

## 5. Listing an NFT for Sale

### User Flow

1. **Go to NFT Inventory:**  
   User navigates to their NFT inventory.

2. **Click "List for Sale":**  
   User clicks the "List for Sale" button.

3. **Enter Price and Confirm:**  
   User enters the price and confirms.

### Code Implementation

- **Component:**  
  There is currently no NFT listing logic or hook in your codebase.

- **To implement NFT listing:**
  - Create a new hook (e.g., `useListNFT`) to handle listing transactions.
  - Add a UI for listing NFTs and collecting price input.
  - Use `useAppState` to update NFT state after listing.

---

## 6. UI Interactions and Feedback

- **Modals:**  
  Use the `useModal` hook and its `setContent` method to show modals for confirmation and additional info.

  ```tsx
  // filepath: views/stake/components/nft/nft-assets/YourComponent.tsx
  import { useModal } from '@/hooks/use-modal';
  import { StakingAssetsItemModal } from './staking-assets-item-modals';

  const { setContent } = useModal();
  setContent(<StakingAssetsItemModal mode="unstake" />, {
    title: 'Unstake in Progress',
  });
  ```

- **Toasts:**  
  Use the `toasting` API for loading, success, and error notifications.

  ```tsx
  // filepath: components/toast-example.tsx
  import { toasting } from '@/components/toast';

  const dismiss = toasting.loading({ message: 'Processing...' });
  toasting.success({
    action: 'Stake',
    message: 'Staked successfully',
    link: explorerUrl,
  });
  toasting.error({ action: 'Stake', message: 'Error occurred' });
  ```

- **Explorer Links:**  
  Use `useGetExplorerUrl` to generate links to the Sui explorer for transactions and objects.

  ```tsx
  // filepath: hooks/use-get-explorer-url-example.tsx
  import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';

  const getExplorerUrl = useGetExplorerUrl();
  const url = getExplorerUrl(txDigest, ExplorerMode.Transaction);
  ```

---

## 7. State Management

- **Global State:**  
  Use `useAppState` to access and update balances, staking objects, and principals.

- **Updating State:**  
  Always use the `update` function from `useAppState` after a successful transaction.

  ```tsx
  // filepath: hooks/use-app-state-example.tsx
  import { useAppState } from '@/hooks/use-app-state';

  const { update } = useAppState();
  update((state) => ({
    ...state,
    balances: { ...state.balances, [token]: newBalance },
  }));
  ```

---

## 8. Example: Full Staking Flow

```tsx
// filepath: views/stake/components/nft/nft-assets/FullStakingExample.tsx
import { useStakingAction } from './staking-assets-item.hooks';
import { useAppState } from '@/hooks/use-app-state';

const stakingObject = /* get staking object */;
const isActivated = (epoch: number) => /* eligibility logic */;
const { onBurn, loading } = useStakingAction(stakingObject, isActivated);

return (
  <button onClick={onBurn} disabled={loading}>
    {stakingObject?.state === 'Staked' ? 'Unstake' : 'Withdraw'}
  </button>
);
```

- The button triggers the staking/unstaking/withdrawal logic, shows modals as needed, and updates state and UI.
- All user feedback (loading, success, error) is handled via `toasting` and modals.

---

## 9. Optimal Approach for Your Project

- **Encapsulate all blockchain logic in hooks** (e.g., `useStakingAction`, `useBurn`).
- **Use `useAppState` for all global state updates.**
- **Show user feedback with `toasting` and `useModal`.**
- **Add new features by following the established hook/component pattern.**
- **Keep all UI logic in components under `views/` and `components/`.**
- **Keep all blockchain and business logic in hooks under `hooks/`.**

---

## 10. File References

- `views/stake/components/nft/nft-assets/staking-assets-item.hooks/index.tsx`: Main logic for staking/unstaking/withdrawing.
- `views/stake/components/nft/nft-assets/staking-assets-item-modals.tsx`: Modals for staking actions.
- `hooks/use-app-state.ts`: Global state management.
- `hooks/use-modal.ts`: Modal management.
- `components/toast.ts`: Toast notifications.
- `hooks/use-get-explorer-url.ts`: Explorer URL generation.

---

## Summary Table

| Operation    | UI Component Location | Logic Hook/Function           | State Update          | User Feedback          |
| ------------ | --------------------- | ----------------------------- | --------------------- | ---------------------- |
| Stake NFT    | `nft-assets/`         | `useStakingAction`            | `useAppState.update`  | `toasting`, `useModal` |
| Unstake NFT  | `nft-assets/`         | `useStakingAction`            | `useAppState.update`  | `toasting`, `useModal` |
| Withdraw NFT | `nft-assets/`         | `useStakingAction`, `useBurn` | `useAppState.update`  | `toasting`, `useModal` |
| Swap Tokens  | _(not implemented)_   | _(to be implemented)_         | _(to be implemented)_ | _(to be implemented)_  |
| List NFT     | _(not implemented)_   | _(to be implemented)_         | _(to be implemented)_ | _(to be implemented)_  |

---

**For any new operation, follow the same pattern:**

- Create a hook for blockchain logic.
- Add UI components for user interaction.
- Use `useAppState` for state updates.
- Use `toasting` and `useModal` for feedback.
