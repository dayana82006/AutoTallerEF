using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using AutoMapper;
using Application.DTOs.Auth;
using Application.DTOs.Entities;
using Application.DTOs;

namespace TallerApi.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Brand, BrandDto>().ReverseMap();
            CreateMap<Client, ClientDto>().ReverseMap();
            CreateMap<FuelType, FuelTypeDto>().ReverseMap();

            CreateMap<Invoice, InvoiceDto>()
                .ForMember(dest => dest.InvoiceDetails, opt => opt.MapFrom(src => src.InvoiceDetails));
            CreateMap<InvoiceDto, Invoice>()
                .ForMember(dest => dest.InvoiceDetails, opt => opt.MapFrom(src => src.InvoiceDetails));

            CreateMap<InvoiceDetail, InvoiceDetailDto>().ReverseMap();
            CreateMap<OrderDetail, OrderDetailDto>().ReverseMap();

            CreateMap<ServiceOrder, ServiceOrderDto>()
                .ForMember(dest => dest.SerialNumber, opt => opt.MapFrom(src => src.VehicleSerialNumber))
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails));

            CreateMap<ServiceOrderDto, ServiceOrder>()
                .ForMember(dest => dest.VehicleSerialNumber, opt => opt.MapFrom(src => src.SerialNumber))
                .ForMember(dest => dest.OrderDetails, opt => opt.MapFrom(src => src.OrderDetails));

            CreateMap<ServiceStatus, ServiceStatusDto>().ReverseMap();
            CreateMap<ServiceType, ServiceTypeDto>().ReverseMap();
            CreateMap<Spare, SpareDto>().ReverseMap();
            CreateMap<Specialty, SpecialityDto>().ReverseMap();
            CreateMap<Vehicle, VehicleDto>().ReverseMap();

            // ✅ Mapeo corregido para incluir los detalles de anormalidad
            CreateMap<VehicleAnormality, VehicleAnormalityDto>()
                .ForMember(dest => dest.VehicleAnormalityDetails, opt => opt.MapFrom(src => src.VehicleAnormalityDetails));
CreateMap<VehicleAnormalityDto, VehicleAnormality>()
    .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => DateTime.SpecifyKind(src.CreatedAt, DateTimeKind.Utc)))
    .ForMember(dest => dest.UpdatedAt, opt => opt.MapFrom(src => src.UpdatedAt.HasValue ? DateTime.SpecifyKind(src.UpdatedAt.Value, DateTimeKind.Utc) : (DateTime?)null))
    .ForMember(dest => dest.VehicleAnormalityDetails, opt => opt.MapFrom(src => src.VehicleAnormalityDetails));

            CreateMap<VehicleAnormalityDetail, VehicleAnormalityDetailDto>().ReverseMap();

            CreateMap<VehicleModel, VehicleModelDto>().ReverseMap();
            CreateMap<VehicleType, VehicleTypeDto>().ReverseMap();
            CreateMap<UserSpecialty, UserSpecialtyDto>().ReverseMap();

            CreateMap<UserMember, UserMemberDto>()
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src =>
                    src.UserRoles != null && src.UserRoles.Any()
                        ? src.UserRoles.First().Role.Name
                        : null
                ))
                .ForMember(dest => dest.Specialties, opt => opt.MapFrom(src =>
                    src.UserSpecialties != null
                        ? src.UserSpecialties.Select(us => us.Specialty.Name).ToList()
                        : new List<string>()
                ));

            CreateMap<UserMemberDto, UserMember>()
                .ForMember(dest => dest.UserRoles, opt => opt.Ignore())
                .ForMember(dest => dest.UserSpecialties, opt => opt.Ignore())
                .ForAllMembers(opts => opts.Condition((src, dest, srcMember) => srcMember != null));
        }
    }
}
