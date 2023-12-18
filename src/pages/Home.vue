<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-3 left-menu-col p-0 bg-default">
                <div class="sticky-top sidebar">
                    <div class="d-none d-md-block">

                        <img src="@/assets/images/logo-green.png" width="125" height="35" alt="">
                        <div class="mt-3 mb-5 description">
                            Trusted way of banking for 3,000+ 
                            SMEs and startups in Singapore
                        </div>
                    </div>
                    <div class="left-menu">
                        <ul>
                            <li>
                                <img src="@/assets/images/home.png" width="24" height="24" alt="">
                                <span class="menu-name">Home</span>
                            </li>
                            <li class="text-green">
                                <img src="@/assets/images/pay.png" width="24" height="24" alt="">
                                <span class="menu-name">Cards</span>
                            </li>
                            <li>
                                <img src="@/assets/images/payments.png" width="24" height="24" alt="">
                                <span class="menu-name">Payments</span>
                            </li>
                            <li>
                                <img src="@/assets/images/credit.png" width="24" height="24" alt="">
                                <span class="menu-name">Credit</span>
                            </li>
                            <li>
                                <img src="@/assets/images/user.png" width="24" height="24" alt="">
                                <span class="menu-name">Settings</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Modal :show-modal="isShowModal" class="text-black" @close-modal="closeModal">
                <template #modal-header>
                    Add New Card
                </template>
                <template #modal-body>
                    <label for="card-name">Enter card name:</label>
                    <input id="card-name" v-model="cardName" type="text" class="form-control">
                    <div class='text-red'>{{ cardNameError }}</div>
                </template>
                <template #modal-footer>
                    <button type="button" class="btn btn-default" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-primary" @click="saveCard">Save Card</button>
                </template>
            </Modal>

            <div class="col-md-9 col-sm-12 col-xs-12 main-content">
                <div class="container">
                    <div class="row xs-fixed">
                        <div class="col-12 mb-2 fs-14">
                            Available balance
                            <div class="mobile-logo float-right mb-2"></div>
                        </div>
                        <div class="col-12 mb-4">
                            <span class="bg-green text-white ss">S$</span> 
                            <b class="fs-24 bold">3,000</b>
                            <button class="btn bg-btn text-white fs-14 float-right" type="button" @click="showModal">
                                <img src="@/assets/images/new-card.png" width="16" height="16" alt=""> New card
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 content">
                            <ul class="nav fs-14 mb-3 xs-fixed">
                                <li class="nav-item mr-5">
                                    <a class="nav-link active" href="#">My debit cards</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">All company cards</a>
                                </li>
                            </ul>
                             <div class="card column1">
                                <div class="card-body">
                                    <div class="row xs-fixed">
                                        <div class="col-md-6 col-sm-12 col-xs-12">
                                            <span class="fs-14 bg-white text-green rounded p-1 pb-3 float-right" style="margin-bottom:-13px;">
                                                <img src="@/assets/images/remove-red-eye.png" width="16" height="16" alt=""/>
                                                Show card number
                                            </span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 col-sm-12 col-xs-12">
                                            <div class="xs-fixed carousal" >
                                                <carousel
                                                    v-model="currentSlide"
                                                    :items-to-show="1"
                                                    :items-to-scroll="1"
                                                    :transition="500"
                                                    :autoplay="3000"
                                                    :wrap-around="true">
                                                    <slide v-for="debitCard in debitCards" :key="debitCard">
                                                        <debit-card :debit-card="debitCard"/>
                                                    </slide>
                                                    <template #addons>
                                                        <!-- <navigation /> -->
                                                        <pagination />
                                                    </template>
                                                </carousel>
                                            </div>

                                            <div class="card flat bg-primary-light text-black">
                                                <div class="card-options d-flex justify-content-around p-3">
                                                    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
                                                    <div class="text-center p-2 cursor-pointer" @click="freezeCard(currentCard)">
                                                        <img src="@/assets/images/freeze-card.png" width="32px" height="32px" alt=""> 
                                                        <div class="debit-card-options">{{ currentCard?.isFreezed ? 'Unfreeze Card' : 'Freeze card'}}</div>
                                                    </div>
                                                    <div class="text-center p-2">
                                                        <img src="@/assets/images/set-spend-limit.png" width="32px" height="32px" alt="">
                                                        <div class="debit-card-options">Set spend limit</div>
                                                    </div>
                                                    <div class="text-center p-2">
                                                        <img src="@/assets/images/gpay.png" width="32px" height="32px" alt="">
                                                        <div class="debit-card-options">Add to Gpay</div>
                                                    </div>
                                                    <div class="text-center p-2">
                                                        <img src="@/assets/images/replace-card.png" width="32px" height="32px" alt="">
                                                        <div class="debit-card-options">Replace card</div>
                                                    </div>
                                                    <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events -->
                                                    <div class="text-center p-2 cursor-pointer" @click="showConfirmModal(currentCard)">
                                                        <img src="@/assets/images/cancel-card.png" width="32px" height="32px" alt="">
                                                        <div class="debit-card-options">Cancel card</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Cancel card modal -->
                                        <Modal :show-modal="isConfirmModal" class="text-black" @close-modal="closeConfirmModal">
                                            <template #modal-header>
                                                Cancel Card
                                            </template>
                                            <template #modal-body>
                                                <div>
                                                    Please confirm the cancellation of card
                                                    <div>Name: {{ selectedCardForCancellation?.name }}</div>
                                                    <div>Card Number: {{ selectedCardForCancellation?.cardNumber }}</div>
                                                </div>
                                            </template>
                                            <template #modal-footer>
                                                <button type="button" class="btn btn-default" @click="closeConfirmModal">Close</button>
                                                <button type="button" class="btn btn-primary" @click="cancelCard()">Confirm</button>
                                            </template>
                                        </Modal>


                                        <div class="bg-white col-md-6 col-sm-12 col-xs-12 text-black mb-5 details">
                                            <div id="accordion" class="accordion">
                                                <div class="card mb-2">
                                                    <div id="card-details" class="card-header">
                                                        <img alt="" src="@/assets/images/card-details.png" width="24px" height="24px">
                                                        <span class="fs-14">Card Details</span>
                                                        <button class="btn btn-link float-right p-0" type="button" data-toggle="collapse" data-target="#card-details-body" aria-expanded="true" aria-controls="card-details-body">
                                                            <img alt="" src="@/assets/images/down-arrow.png" width="20px" height="20px">
                                                        </button>
                                                    </div>
                                                </div>

                                                <div class="card mb-2">
                                                    <div id="recent-transactions" class="card-header">
                                                        <img alt="" src="@/assets/images/recent-transactions.png" width="24px" height="24px">
                                                        <span class="fs-14">Recent transactions</span>
                                                        <button class="btn btn-link float-right p-0" type="button" data-toggle="collapse" data-target="#recent-transactions-body" aria-expanded="true" aria-controls="recent-transactions-body">
                                                            <img alt="" src="@/assets/images/down-arrow.png" width="20px" height="20px">
                                                        </button>
                                                    </div>
                                              
                                                    <div id="recent-transactions-body" class="collapse show" aria-labelledby="recent-transactions" data-parent="#accordion">
                                                        <div class="card-body">
                                                            <!-- 1 -->
                                                            <div class="row border-bottom transactions">
                                                                <div class="col-2 pl-0">
                                                                    <div class="icon-wrapper bg-primary-light">
                                                                        <img alt="" src="@/assets/images/file-storage.png" width="16px" height="16px">
                                                                    </div>
                                                                </div>
                                                                <div class="col-10 pr-0">
                                                                    <div>
                                                                        <b>Hamley</b>
                                                                        <span class="amount credit float-right">
                                                                            +S$ 150
                                                                            <img alt="" src="@/assets/images/next.png" width="7" height="12"> 
                                                                        </span>
                                                                    </div>
                                                                    <div class="grey mb-2">20 May 2020</div>
                                                                    <div class="transaction fs-14">
                                                                        <div class="transaction-icon-wrapper bg-default mr-2">
                                                                            <img alt="" src="@/assets/images/business-finance.png" width="10px" height="8px">
                                                                        </div>
                                                                        Refund on debit card
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- 2 -->
                                                            <div class="row border-bottom transactions">
                                                                <div class="col-2 pl-0">
                                                                    <div class="icon-wrapper bg-success-light">
                                                                        <img alt="" src="@/assets/images/flights.png" width="16px" height="16px">
                                                                    </div>
                                                                </div>
                                                                <div class="col-10 pr-0">
                                                                    <div>
                                                                        <b>Hamley</b>
                                                                        <span class="amount float-right">
                                                                            -S$ 150
                                                                            <img alt="" src="@/assets/images/next.png" width="7" height="12"> 
                                                                        </span>
                                                                    </div>
                                                                    <div class="grey mb-2">20 May 2020</div>
                                                                    <div class="transaction fs-14">
                                                                        <div class="transaction-icon-wrapper bg-default mr-2">
                                                                            <img alt="" src="@/assets/images/business-finance.png" width="10px" height="8px">
                                                                        </div>
                                                                        Charged to debit card
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- 3 -->
                                                            <div class="row border-bottom transactions">
                                                                <div class="col-2 pl-0">
                                                                    <div class="icon-wrapper bg-danger-light">
                                                                        <img alt="" src="@/assets/images/megaphone.png" width="16px" height="16px">
                                                                    </div>
                                                                </div>
                                                                <div class="col-10 pr-0 ">
                                                                    <div>
                                                                        <b>Hamley</b>
                                                                        <span class="amount float-right">
                                                                            -S$ 150
                                                                            <img alt="" src="@/assets/images/next.png" width="7" height="12"> 
                                                                        </span>
                                                                    </div>
                                                                    <div class="grey mb-2">20 May 2020</div>
                                                                    <div class="transaction fs-14">
                                                                        <div class="transaction-icon-wrapper bg-default mr-2">
                                                                            <img alt="" src="@/assets/images/business-finance.png" width="10px" height="8px">
                                                                        </div>
                                                                        Charged to debit card
                                                                    </div>
                                                                </div>
                                                            </div>  
                                                            <!-- 4 -->
                                                            <div class="row transactions">
                                                                <div class="col-2 pl-0">
                                                                    <div class="icon-wrapper bg-primary-light">
                                                                        <img alt="" src="@/assets/images/file-storage.png" width="16px" height="16px">
                                                                    </div>
                                                                </div>
                                                                <div class="col-10 pr-0 ">
                                                                    <div>
                                                                        <b>Hamley</b>
                                                                        <span class="amount float-right">
                                                                            -S$ 150
                                                                            <img alt="" src="@/assets/images/next.png" width="7" height="12"> 
                                                                        </span>
                                                                    </div>
                                                                    <div class="grey mb-2">20 May 2020</div>
                                                                    <div class="transaction fs-14">
                                                                        <div class="transaction-icon-wrapper bg-default mr-2">
                                                                            <img alt="" src="@/assets/images/business-finance.png" width="10px" height="8px">
                                                                        </div>
                                                                        Charged to debit card
                                                                    </div>
                                                                </div>
                                                            </div>  
                                                        </div>
                                                    </div>
                                                    <div class="card-footer p-3 fs-14 text-center bg-success-light text-green">
                                                        View all card transactions
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'vue3-carousel/dist/carousel.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Carousel, Slide, Pagination } from 'vue3-carousel';

// eslint-disable-next-line import/no-unresolved
import DebitCard from '@/components/DebitCard.vue';
// eslint-disable-next-line import/no-unresolved
import Modal from '@/components/Modal.vue';

// eslint-disable-next-line import/no-unresolved
import { useCardsStore } from '@/store/cards';

const cardsStore = useCardsStore();
const debitCards = computed(() => cardsStore.debitCards);

const isShowModal = ref(false);
const showModal = () => {
    isShowModal.value = true;
}
const closeModal = () => {
    isShowModal.value = false;
}

const isConfirmModal = ref(false);

let selectedCardForCancellation = null;
const showConfirmModal = (selectedCard) => {
    if ( cardsStore.debitCards.length > 1 ) {
        isConfirmModal.value = true;
        selectedCardForCancellation = selectedCard;
    }
}
const closeConfirmModal = () => {
    isConfirmModal.value = false;
}


const currentSlide = ref(0);
const generateRandomCardNumber = () => Math.random().toString().slice(2, 14);
const generateRandomExpirationDate = () => {
    const month = Math.floor(Math.random() * 12 + 1);
    const year = Math.floor(Math.random() * 6 + 23);
    return `${month}/${year}`;
}

const cardName = ref();
const cardNameError = ref('');
const saveCard = () => {
    if ( /^(([a-zA-z])+([a-zA-Z\s])*)$/.test(cardName.value) ) {
        cardNameError.value = '';
        const newCard = {
            "name": cardName.value,
            "expirationDate": generateRandomExpirationDate(),
            "cardNumber": generateRandomCardNumber(),
            "isFreezed": false
        }
        cardsStore.debitCards.push(newCard);
        closeModal();
        cardName.value = '';
    } else {
        cardNameError.value = 'Please enter a valid name';
    }
}

const getDebitCards = async() => {
    const { data } = await axios.get('http://localhost:8080/src/mock-data.json')
    cardsStore.debitCards = data;
}
getDebitCards();

const currentCard = computed(() => debitCards.value[currentSlide.value]);

const freezeCard = (selectedCard) => {
    // eslint-disable-next-line no-param-reassign
    selectedCard.isFreezed = !selectedCard.isFreezed;
}

const cancelCard = () => {
    cardsStore.debitCards.splice(cardsStore.debitCards.findIndex(card => card.cardNumber === selectedCardForCancellation.cardNumber) , 1);
    closeConfirmModal();
    selectedCardForCancellation = null;
}

</script>