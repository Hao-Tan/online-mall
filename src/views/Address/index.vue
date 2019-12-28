<template>
    <div class="address">
        <div class="bread-wrapper">
            <nav-bread currentPage="My Address" class="content-wrapper"></nav-bread>
        </div>
        <article class="address-content">
            <el-container class="content-wrapper" direction="vertical">
                <pay-step :stepIndex="1" class="g-page-step"></pay-step>
                <h2 class="g-sub-title">
                    SHIPPING ADDRESS
                </h2>
                <div class="address-wrapper">
                    <el-row class="address-list" tag="ul" :gutter="20">
                        <el-col class="address-item-wrapper" tag="li" :xl="6" :lg="6" :md="8" :sm="12" :xs="24" v-for="item in filteredAddressList" :key="item.addressId">
                            <div class="address-item" :class="{'address-selected': selectedId === item.addressId}" @click="selectedId = item.addressId">
                                <dl>
                                    <dt class="address-rec">{{item.userName}}</dt>
                                    <dd class="address-loc">{{item.postCode +"  "+ item.streetName}}</dd>
                                    <dd class="address-tel">{{item.tel}}</dd>
                                </dl>
                                <span class="address-more">
                                    <span class="default-address" v-if="item.isDefault === true">Default Address</span>
                                    <span class="set-default" v-else @click="setDefault(item.addressId)">Set Default</span>
                                    <i class="el-icon-delete" @click.stop="deleteAddressConfirm(item.addressId)"></i>     
                                </span>
                            </div>
                        </el-col>
                        <el-col class="address-item-wrapper" tag="li" :xl="6" :lg="6" :md="8" :sm="12" :xs="24">
                            <div class="address-item address-add">
                                <i class="el-icon-plus"></i>
                                <p>Add New Address</p>
                            </div>
                        </el-col>
                    </el-row>
                    <a href="javascript:;" class="more-address" @click="limit += 3" v-if="limit < addressList.length">
                        more <i class="el-icon-arrow-down"></i>
                    </a>
                </div>
                <h2 class="g-sub-title">
                    SHIPPING METHOD
                </h2>
                <el-row class="address-list" tag="ul" :gutter="20">
                    <el-col class="address-item-wrapper" tag="li" :xl="6" :lg="6" :md="8" :sm="12" :xs="24">
                        <div class="address-item express-item">
                            <dl>
                                <dt class="address-mode">Standard shipping</dt>
                                <dd class="address-cost">Free</dd>
                                <dd class="address-intro">Once shipped，Order should arrive in the destination in 1-7 business days</dd>
                            </dl>
                        </div>
                    </el-col>
                </el-row>

                <div class="next">
                    <router-link class="g-next-btn" :to="{path:'orderConfirm',query:{'addressId':selectedId}}">Next</router-link>
                </div>
            </el-container>

            
        </article>

        <el-dialog
            :visible.sync="deleteConfirm"
            width="30%"
            top="0"
            center
            class="g-cart">
            <el-row 
                type="flex"
                justify="center"
                align="middle">
                <span>您是否确认要删除此地址?</span>
            </el-row>
            <span slot="footer">
                <el-button @click.native="deleteAddress" class="left-btn g-cart-btn">确定</el-button>
                <el-button type="primary" @click.native="deleteConfirm = false" class="right-btn g-cart-btn">取消</el-button>
            </span>
        </el-dialog>

        <el-dialog
            :visible.sync="deleteFail"
            width="30%"
            top="0"
            center
            class="g-cart">
            <el-row 
                type="flex"
                justify="center"
                align="middle">
                <span>地址列表至少需要有一条数据,已无法继续删除.</span>
            </el-row>
            <el-button @click.native="deleteFail = false" class="left-btn md-btn" slot="footer" style="width:50%;">关闭</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import NavBread from 'components/NavBread';
    import PayStep from 'components/PayStep';
    export default {
        name: "Address",
        components: {
            NavBread,
            PayStep
        },
        data() {
            return {
                addressList: [],
                selectedId: "",
                limit: 3,
                deleteConfirm: false,
                deleteFail: false,
                deleteId: ""
            }
        },
        computed: {
            filteredAddressList() {
                return this.addressList.slice(0, this.limit);
            }
        },
        created() {
            this.getAddressList();
        },
        methods: {
            getAddressList() {
                axios.get("/users/addressList").then(({data}) => {
                    if (data.status === "0") {
                        this.addressList = data.result;
                        this.selectedId = this.addressList[0].addressId;
                    }
                })
            },
            setDefault(addressId) {
                axios.post("/users/setDefault", {addressId}).then(({data}) => {
                    if (data.status === "0") {
                        this.addressList.forEach(address => {
                            if (address.addressId === addressId) {
                                address.isDefault = true;
                            } else {
                                address.isDefault = false;
                            }
                        })
                    }
                })
            },
            deleteAddressConfirm(addressId) {
                if (this.addressList.length === 1) {
                    this.deleteFail = true;
                } else {
                    this.deleteId = addressId;
                    this.deleteConfirm = true;
                }
            },
            deleteAddress(){
                axios.post("/users/delAddress", {
                    addressId: this.deleteId
                }).then(({data}) => {
                    if (data.status === "0") {
                        this.addressList = this.addressList.filter(address => {
                            return address.addressId !== this.deleteId;
                        })
                        this.deleteConfirm = false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";
    .address {
        &-item {
            font-size: 14px;
            border: 2px solid #e9e9e9;
            margin-bottom: 20px;
            padding: 20px;
            cursor: pointer;
            background-color: #fff;
            height: 162px;

            &.address-selected {
                border-color: #ee7a23;
            }

            &:hover {
                border-color: #ee7a23;
            }

            .address-rec {
                color: #333;
                margin-bottom: 10px;
                font-size: 16px;
            }

            .address-loc {
                color: #333;
                height: 40px;
                line-height: 20px;
                @include multiline-ellipsis(2);
                margin-bottom: 10px;
            }

            .address-tel {
                color: #605f5f;
                margin-bottom: 10px;
            }

            .address-more {
                @include flex-between();

                .default-address {
                    color: #ee7a23
                }

                .set-default:hover {
                    color: #ee7a23
                }

                i {
                    font-size: 20px;

                    &:hover {
                        color: #ee7a23;
                    }
                }
            }
        }

        &-add {
            @include flex-center(column);

            i {
                font-size: 50px;
            }

            p {
                color: #e5dbdb;
                margin-top: 10px;
            }
        }

        .more-address {
            @include flex-center();
            font-size: 14px;
            color: #ee7a23;
        }

        .express-item {
            border: 2px solid #ee7a23;
        }

        &-mode {
            color: #333;
            font-size: 16px;
            margin-bottom: 10px;
        }

        &-cost {
            color: #333;
            font-size: 16px;
            margin-bottom: 10px;
            font-weight: 700;
        }

        &-intro {
            color: #999;
            margin-top: 20px;
        }

        .next {
            width: 100%;
            display: flex;
            flex-direction: row-reverse;
            margin: 30px 0;

            & .g-next-btn,
            & .g-back-btn {
                width: 200px;
                height: 40px;
                line-height: 40px;
                text-align: center;
            }
        }
    }
</style>