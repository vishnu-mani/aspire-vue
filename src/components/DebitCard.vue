<template>
    <div class="p-4 debit-card" :class="[debitCard.isFreezed ? 'bg-gray-300' : 'bg-green']">
        <div class="text-right">
            <img src="@/assets/images/logo-white.png" width="84px" height="24px" alt="">
        </div>
        <div class="card-name">{{ debitCard.name }}</div>
        <div class="mb-1 fs-14">
            <span class="card-number mr-3">
                <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
                <input type='password' :value="debitCard.cardNumber" readonly="true" disabled="true" />
            </span>
        </div>
        <div class="mb-1 bold fs-14">
            <span class="mr-3">Thru : {{ debitCard.expirationDate }}</span>
            <span class="mr-3">CVV :</span>
            <span class="cvv">***</span>
        </div>
        <div class="text-right">
            <img src="@/assets/images/visa-logo.png" width="66px" height="24px" alt="">
        </div>
    </div>
</template>

<script setup>

defineProps({
    debitCard : {
        type: Object,
        default(){
            return {
                name: 'Mark Henry',
                expirationDate: '12/22',
                cardNumber: '123456789012'
            }
        }
    }
});
</script>